/**
 * 
 * @author TSG
 * @module
 */ 
function CalculateFlatSaldo() {
    var self = this, model = this.model;
    var peniClc = new CalculatePeni();
    //var progress = new ProgressShow();
    
    
    self.calculateFlatSaldo = function(aGroupID, aFlatID, aDateID) {
        (function(){
        model.params.parDateID = aDateID;
        model.params.parFlatID = aFlatID;
        model.params.parGroupID = aGroupID;

        model.dsAllAccounts.forEach(function(cursor){            
            model.params.parAccountID = cursor.grp_account_id;
            model.dsSumOfSums.requery();
            model.dsSumOfPayments.requery();
            model.dsSaldo4calc.requery();
            serverProgress.setMax(self.dsSaldo4calc.length);
            serverProgress.setDescription("Расчет сальдо по счету "+ cursor.account_name);
            model.dsSaldo4calc.forEach(function(saldo){
                //Logger.info("Расчет сальдо в квартире: " + self.dsSaldo4calc.cursor.lc_id);                
                var sc = getSumOfSums(cursor.account_name, saldo.lc_id);
                var sp = model.dsSumOfPayments.find(model.dsSumOfPayments.schema.flat_id, saldo.lc_id);
                var peni = peniClc.calculate(saldo.lc_id, model.params.parDateID, model.params.parAccountID);
                var peniOld = peni.previous;
                var saldoOld = peni.saldo ? peni.saldo : saldo.sal_begin;
                peni = peni.current;
                saldo.sal_penalties_old = peniOld;

                if (sp.length == 1)
                    sp = sp[0];
                else
                    sp.pay_sum = 0;
                saldo.sal_begin = saldoOld;
                saldo.sal_calc = sc.sal_calc;
                saldo.sal_benefit = sc.sal_benefit;
                saldo.sal_recalc = sc.sal_recalc;
                saldo.sal_full_calc = sc.sal_full_calc;
                saldo.sal_payments = sp.pay_sum;
                var endSum = saldo.sal_begin - sp.pay_sum;
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
                peni += peniOld;
                endSum += sc.sal_full_calc;
                saldo.sal_end = endSum;
                saldo.sal_penalties_cur = peni;
                saldo.sal_penalties_pay = peniPay.toFixed(2);

                serverProgress.increaseValue();
            });
                serverProgress.setDescription("Сохранение финальных значений");
            model.save();
        });
                serverProgress.finish();
        }).invokeBackground();
    };
        
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
