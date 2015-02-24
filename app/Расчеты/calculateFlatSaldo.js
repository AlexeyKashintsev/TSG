/**
 * 
 * @author TSG
 * @module
 */ 
function CalculateFlatSaldo() {
    var self = this, model = this.model;
    var peniClc = new CalculatePeni();
    
    self.calculateFlatSaldo = function(aGroupID, aFlatID, aDateID) {
        model.params.parDateID = aDateID;
        model.params.parFlatID = aFlatID;
        model.params.parGroupID = aGroupID;

        model.dsAllAccounts.forEach(function(cursor){
            model.params.parAccountID = cursor.grp_account_id;
            model.dsSumOfSums.requery();            
            model.dsSumOfPayments.requery();
            model.dsSaldo4calc.requery();
            model.dsSaldo4calc.beforeFirst();
            while (model.dsSaldo4calc.next()) {
                
                Logger.info("Расчет сальдо в квартире: " + self.dsSaldo4calc.cursor.lc_id);
                var sc = self.dsSumOfSums.find(self.dsSumOfSums.schema.lc_id, self.dsSaldo4calc.lc_id)[0];
                var sp = self.dsSumOfPayments.find(self.dsSumOfPayments.schema.flat_id, self.dsSaldo4calc.lc_id);
                var peni = peniClc.calculate(self.dsSaldo4calc.lc_id, self.model.params.parDateID, model.params.parAccountID);
                var peniOld = peni.previous;
                var saldoOld = peni.saldo ? peni.saldo : self.dsSaldo4calc.sal_begin;
                peni = peni.current;
                self.dsSaldo4calc.sal_penalties_old = peniOld;

                if (sp.length == 1)
                    sp = sp[0];
                else
                    sp.pay_sum = 0;
                self.dsSaldo4calc.sal_begin = saldoOld;
                self.dsSaldo4calc.sal_calc = sc.sal_calc;
                self.dsSaldo4calc.sal_benefit = sc.sal_benefit;
                self.dsSaldo4calc.sal_recalc = sc.sal_recalc;
                self.dsSaldo4calc.sal_full_calc = sc.sal_full_calc;
                self.dsSaldo4calc.sal_payments = sp.pay_sum;
                var endSum = self.dsSaldo4calc.sal_begin - sp.pay_sum;
                if (endSum < 0 && peniOld > 0) {
                    var extra = -endSum;
                    if (extra >= peniOld) {
                        extra -= peniOld;
                        peniOld = 0;
                    } else {
                        peniOld -= extra;
                        extra = 0;
                    }
                    endSum = -extra;
                }
                peni += peniOld;
                endSum += sc.sal_full_calc;
                self.dsSaldo4calc.sal_end = endSum;
                self.dsSaldo4calc.sal_penalties_cur = peni;

                /*(function() {
                    progress.increaseValue(1);
                }).invokeAndWait();*/
            }});
            /*(function() {
                progress.setDescription("Сохранение финальных значений");
            }).invokeAndWait();*/
            self.model.save();
        };
}
