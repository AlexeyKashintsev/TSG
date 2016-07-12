/**
 * 
 * @name CalculateFlatSaldo
 * @author TSG
 * @module
 */ 
function CalculateFlatSaldo() {
    var self = this, model = this.model;
//    var peniClc = new CalculatePeni();
    //var progress = new ProgressShow();
    var peniNew = new calcPeniNew();
    
    self.calculateFlatSaldo = function(aGroupID, aFlatID, aDateID) {
        proceed(aGroupID, aFlatID, aDateID, function(cursor, values) {
            for (var j in values)
                cursor[j] = values[j];
        });
    };
    
    var errors = [];
    self.getErrors = function() {
        return errors;
    };
    self.doAudit = function(aGroupID, aFlatID, aDateID) {
        function doCheckValues(cursor, values) {
            for (var j in values)
                try {
                    if ((cursor[j]).toFixed(2) != (values[j]).toFixed(2)) {
                        var er = {
                            er_type: "Расчитанное и сохраненное значения сальдо не совпадают",
                            lc_id: cursor.lc_id,
                            service_id: cursor.services_id,
                            date_id: cursor.date_id,
                            value_name: j,
                            saved_value: cursor[j],
                            calculated_value: values[j]
                        };
                        Logger.warning(er.er_type + ': ' + er.saved_value + ' != ' + er.calculated_value);
                        errors.push(er);
                    }
                } catch (e) {
                        if (!cursor[j] && values[j] || cursor[j]) {
                            var er = {
                                er_type: "Ошибка при сравнении: " + e,
                                lc_id: cursor.lc_id,
                                service_id: cursor.services_id,
                                date_id: cursor.date_id,
                                value_name: j,
                                saved_value: cursor[j],
                                calculated_value: values[j]
                            };
                            Logger.warning(er.er_type + ': ' + er.saved_value + ' != ' + er.calculated_value);
                            errors.push(er);
                        }
                }
        }
        
        function endProcess() {
            serverProgress.finish();
        }
        
        errors = [];
        
        proceed(aGroupID, aFlatID, aDateID, doCheckValues, endProcess);
    };
    
    function proceed(aGroupID, aFlatID, aDateID, aProceedFunction) {
        model.params.parDateID = aDateID;
        model.params.parFlatID = aFlatID;
        model.params.parGroupID = aGroupID;

        model.dsAllAccounts.forEach(function(cursor){            
            model.params.parAccountID = cursor.grp_account_id;
            model.dsSumOfSums.requery();
            model.dsSumOfPayments.requery();
            model.dsSaldo4calc.requery();
            serverProgress.setMax(self.dsSaldo4calc.length);
            serverProgress.setValue(0);
            serverProgress.setDescription("Расчет сальдо по счету "+ cursor.account_name);
            model.dsSaldo4calc.forEach(function(saldo){
                //Logger.info("Расчет сальдо в квартире: " + self.dsSaldo4calc.cursor.lc_id);                
                aProceedFunction(saldo, getValues(cursor, saldo));
                serverProgress.increaseValue(1);
            });
                serverProgress.setDescription("Сохранение финальных значений");
            model.save();
        });
        serverProgress.finish();
    };
    
    function getValues(cursor, data) {
        var res = {};
        var sc = getSumOfSums(cursor.account_name, data.lc_id);
        var sp = model.dsSumOfPayments.find(model.dsSumOfPayments.schema.flat_id, data.lc_id);
        
        if (sp.length == 1)
            sp = sp[0];
        else
            sp.pay_sum = 0;

        res.sal_calc = sc.sal_calc;
        res.sal_benefit = sc.sal_benefit;
        res.sal_recalc = sc.sal_recalc;
        res.sal_full_calc = sc.sal_full_calc;
        res.sal_payments = sp.pay_sum;
        
        var endSum;
//        doCalcPeni
        if (model.dsMainGroupByLCWithAccounts.cursor.calculate_peni) {
//            var peni = peniClc.calculate(data.lc_id, model.params.parDateID, model.params.parAccountID);
            var peni = {
                previous: data.sal_penalties_old
            };
            try {
                peni = peniNew.calculate(data, sp.pay_sum);
            } catch (e) {
                Logger.warning('Ошибка расчета пени: ' + e);
            }
            var peniOld = peni.previous;
            var saldoOld = peni.saldo ? peni.saldo : data.sal_begin;
            endSum = saldoOld - sp.pay_sum;
            peni = peni.current ? peni.current : 0;
            res.sal_penalties_old = peniOld;
            
            var peniPay = 0;
            if (endSum < 0 && peniOld > 0) {
                var extra = -endSum;
                if (extra >= peniOld) {
                    extra -= peniOld;
                    peniPay = peniOld;
                    peniOld = 0;
                } else {
                    peniOld -= extra;
                    peniPay = extra;
                    extra = 0;
                }
                endSum = -extra;
            }
            
            res.sal_penalties_calc = data.calc_peni ? peni.toFixed(2) : 0; //Здесь определяем стоит ли добавлять пени
            res.sal_penalties_cur = (res.sal_penalties_calc + peniOld).toFixed(2);
            res.sal_penalties_pay = peniPay.toFixed(2);
        } else {
            saldoOld = data.sal_begin;
            endSum = saldoOld - sp.pay_sum;
        }
        res.sal_begin = saldoOld;
        endSum += sc.sal_full_calc;
        res.sal_end = endSum;
        
        return res;
    }
        
    function getSumOfSums(anAccount, aLCID){
        var sa;
//            model.dsSumOfSums.requery();
        if (model.dsSumOfSums.find(model.dsSumOfSums.schema.lc_id, aLCID).length !== 0)
            sa = model.dsSumOfSums.find(model.dsSumOfSums.schema.lc_id, aLCID)[0];
        else {
            sa = {
                sal_calc:       0,
                sal_benefit:    0,
                sal_recalc:     0,
                sal_full_calc:  0
            };
            Logger.warning('В расчетном счете "' + anAccount + '" нет начислений!');
        }
        return sa;        
    };
}
