/**
 * 
 * @author Алексей
 * @module
 */
function calcPeniNew() {
    var self = this, model = this.model;

    var dateMod = new DateModule();
    var payments = {};
    var prevPeni, prevSaldo;

    function getDebtAge(aDebtDate, aDateTo) {
        var date = typeof aDateTo === 'number' ?
                getDate(aDateTo).per_calc_day : aDateTo;
        var ddate = typeof aDebtDate === 'number' ?
                aDebtDate(aDateTo).per_pay_day : aDebtDate;
        var diff = date - ddate;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    function getDateWithAddDays(aDate, aDays) {
        var nDate = new Date(aDate);
        nDate.setHours(nDate.getHours() + aDays * 24);
        return nDate;
    }

    function getDate(aDateId) {
        return model.all_dates.findById(aDateId);
    }

    function checkCurrentDebt(aCSaldo, aSum) {
        if (aCSaldo.sal_begin - aSum > 0) {
            function createDebt() {
                var dd = getDate(cs.date_id).per_pay_day;
                model.qDebtsByLC.push({
                    per_saldo: cs.per_saldo_flat_id,
                    debt_sum: cs.sal_full_calc,
                    debt_remain: cs.sal_full_calc,
                    debt_age: 0,
                    debt_date: dd
                });
                model.qDebtById.push({
                    debt_id: model.qDebtsByLC.cursor.per_debts_id,
                    debt_remain:  model.qDebtsByLC.cursor.debt_sum,
                    debt_age_days:  0,
                    peni_calculated: 0,
                    peni_days: 0,
                    debt_paid: 0,
                    op_date: dd
                });
                model.save();
            }
            model.saldo4calc.params.dateid = dateMod.prevDate(aCSaldo.date_id);
            model.saldo4calc.requery();
            var cs = model.saldo4calc.cursor;
            var f = model.qDebtsByLC.find(model.qDebtsByLC.schema.per_saldo, cs.per_saldo_flat_id);
            
            if (!f.length) {
                createDebt();
            } else {
                if (f[0].debt_sum !== cs.sal_full_calc || +f[0].debt_date !== +getDate(cs.date_id).per_pay_day) {
                    model.qDebtsByLC.scrollTo(f);
                    model.qDebtsByLC.deleteRow();
                    createDebt();
                }
            }
            prevPeni = cs.sal_penalties_cur;
            prevSaldo = cs.sal_end;
        }
    }
    
    function getPeniForPeriod(aStartDate, anEndDate, anAge, aSum, aDate) {
        var diff = Math.floor((anEndDate - aStartDate) / (1000 * 60 * 60 * 24));
        var rate;
        model.qPeniPeriods.forEach(function(period) {
            if (anAge >= period.debt_age) {
                rate = period.peni_rate ? 1/period.peni_rate : 0;
            }
        });
        return {
            days : diff,
            peni : diff * aSum * aDate.per_srf * rate
        };
    };
    
    function addOperation(aDebt, aPayment, aDateFrom, aDateTo, aCurDate) {
        var peniOp = getPeniForPeriod(aDateFrom, aDateTo, aDebt.debt_age, aDebt.debt_remain, aCurDate);
        var paid = 0;
        if (aPayment) {
            if (aDebt.debt_remain <= aPayment.sum) {
                paid = aPayment.sum;
            } else {
                paid = aDebt.debt_remain;
                aPayment.sum = aPayment.sum - paid;
            }
            aDebt.debt_remain = aDebt.debt_remain - paid;
        }
        aDebt.debt_age = getDebtAge(aDebt.debt_date, aDateTo);
        
        model.qDebtByIdM.push({
            debt_id: model.qDebtsByLC.cursor.per_debts_id,
            debt_remain:  aDebt.debt_remain,
            debt_age_days:  getDebtAge(aDebt.debt_date, aDateTo),
            peni_calculated: peniOp.peni,
            peni_days: peniOp.days,
            debt_paid: paid,
            op_date: aDateTo,
            payment_id: aPayment ? aPayment.id : null
        });
        
        return peniOp.peni;
    };

    function proceedDebts(curDate) {
        var peni = 0;
        model.qDebtsByLC.forEach(function(debt) {
            model.qDebtById.params.debt_id = debt.per_debts_id;
            model.qDebtById.requery();
            model.qDebtById.last();
            var lastOp = model.qDebtById.cursor;
            var nextPeriod, pp = 0;
            model.qPeniPeriods.forEach(function(period) {
                if (period.debt_age > debt.debt_age && pp <= debt.debt_age) {
                    nextPeriod = getDateWithAddDays(debt.debt_date, period.debt_age);
                    pp = period.debt_age;
                }
            });
//            var nextPeriod = (debt.debt_age < 30 ? debt.next_30 : (
//                    debt.debt_age < 90 ? debt.next_90 : null));
            for (var j in payments) {                
                if (nextPeriod && +nextPeriod < +payments[j].date)
                    peni += addOperation(debt, null, lastOp.op_date, nextPeriod, curDate);
                peni += addOperation(debt, payments[j], lastOp.op_date, payments[j].date, curDate);
            };
            
            if (debt.debt_remain > 0) {
                if (nextPeriod && +nextPeriod < +curDate.per_calc_day)
                    peni += addOperation(debt, null, lastOp.op_date, nextPeriod, curDate);
                peni += addOperation(debt, null, lastOp.op_date, curDate.per_calc_day, curDate);
            }
        });
        model.save();
        return peni;
    }

    self.calculate = function(aCurrentSaldo, aSumOfPayments) {
        prevPeni = prevSaldo = null;
        model.qPeniPeriods.params.dateId = aCurrentSaldo.date_id;
        model.qPeniPeriods.execute();
        model.saldo4calc.params.flatid =
                model.qDebtsByLC.params.lcId = aCurrentSaldo.lc_id;
        model.saldo4calc.params.accountid =
                model.qDebtsByLC.params.accountId = aCurrentSaldo.account_id;
        model.qDebtsByLC.requery();

        checkCurrentDebt(aCurrentSaldo, aSumOfPayments);

        if (model.qDebtsByLC.length) {
            model.qPaymentsByDate.params.accountId = aCurrentSaldo.account_id;
            model.qPaymentsByDate.params.dateId = aCurrentSaldo.date_id;
            model.qPaymentsByDate.params.flatId = aCurrentSaldo.lc_id;
            model.qPaymentsByDate.requery();
            payments = {};
            model.qPaymentsByDate.forEach(function(payment) {
                payments.push({
                    date:   payment.payment_date,
                    sum:    payment.payment_sum,
                    id:     payment.opl_payments_id
                });
            });
            var peni = proceedDebts(getDate(aCurrentSaldo.date_id));
        } else
            peni = 0;
        
        if (!prevSaldo) {
            model.saldo4calc.params.dateid = dateMod.prevDate(aCurrentSaldo.date_id);
            model.saldo4calc.requery();
            prevPeni = model.saldo4calc.cursor.sal_penalties_cur;
            prevSaldo = model.saldo4calc.cursor.sal_end;
        }
        
        return {
            current:    peni,
            previous:   prevPeni,
            saldo:      prevSaldo
        };
    };

}
