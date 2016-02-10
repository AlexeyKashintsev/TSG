/**
 * 
 * @author Алексей
 * @module
 */
function calcPeniNew() {
    var self = this, model = this.model;

    var dateMod = new DateModule();
    var curSaldo = model.saldo4calc.cursor;
    var dates = {};

    function getDebtAge(aDebtDateId, aDateTo) {
        var date = typeof aDateTo === 'number' ?
                getDate(aDateTo).per_calc_day : aDateTo;
        var diff = date - getDate(aDebtDateId).per_pay_day;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    function getDateWithAddDays(aDate, aDays) {
        var nDate = aDate;
        nDate.setHours(nDate.getHours() + aDays * 24);
        return nDate;
    }

    function getDate(aDateId) {
        return model.all_dates.findById(aDateId);
    }

    function checkCurrentDebt(aCSaldo, aSum) {
        if (aCSaldo.sal_begin - aSum > 0) {
            model.saldo4calc.params.dateid = dateMod.prevDate(aCSaldo.date_id);
            model.saldo4calc.requery();
            var cs = model.saldo4calc.cursor;
            model.qDebtsByLC.push({
                per_saldo: cs.per_saldo_flat_id,
                debt_sum: cs.sal_full_calc,
                debt_remain: cs.sal_full_calc,
                debt_age: getDebtAge(cs.date_id, aCSaldo.date_id),
                debt_date: getDate(cs.date_id).per_pay_day
            });
        }
    }

    function proceedDebts() {
        //TODO HERE!!!
    }

    self.calculate = function(aCurrentSaldo, aSumOfPayments) {
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
            proceedDebts();
        } else
            return 0;
    };

}
