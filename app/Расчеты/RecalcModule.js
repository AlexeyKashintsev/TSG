/**
 * 
 * @name RecalcModule
 * @author Alexey
 * @module
 */ 
function RecalcModule() {
    var self = this, model = this.model;
    
    self.Recalc = function(aGroupID, aFlatID, aServiceID, aDateID, aCost, aCountersDate) {
        model.dsRecalc.params.countersDate = aCountersDate;
        model.dsRecalc.params.dateid = aDateID;
        model.dsRecalc.params.flatid = aFlatID;
        model.dsRecalc.params.groupid = aGroupID;
        model.dsRecalc.params.serviceid = aServiceID;
        
        model.dsRecalc.requery(function(){
            model.dsRecalc.beforeFirst();
            model.dsRecalc.forEach(function(cursor) {
                cursor.recalc = (cursor.end_val - cursor.beg_val) * aCost;
            });
            model.save();
        });
    };
    
    self.recalcPeni = function(anAccountId, aFlatId, aStartDateId) {
        var peniCalc = new calcPeniNew();
        var peni = {};
        model.saldo_by_flat.params.account_id = anAccountId;
        model.saldo_by_flat.params.flat_id = aFlatId;
        
        model.qSuperiorDates.params.date_id = aStartDateId;
        model.qSuperiorDates.requery();
        model.qSuperiorDates.beforeFirst();
        while (model.qSuperiorDates.next()) {
            model.saldo_by_flat.params.date_id = model.qSuperiorDates.cursor.per_date_id;
            model.saldo_by_flat.requery();
            if (model.saldo_by_flat.length && model.saldo_by_flat.cursor.calc_peni) {
                peni = peniCalc.calculate(model.saldo_by_flat.cursor, model.saldo_by_flat.cursor.sal_payments
                        + model.saldo_by_flat.cursor.sal_penalties_pay);
                
                model.saldo_by_flat.cursor.sal_penalties_calc = peni.current.toFixed(2);
                model.saldo_by_flat.cursor.sal_penalties_cur = (peni.previous + peni.current
                    - model.saldo_by_flat.cursor.sal_penalties_pay).toFixed(2);
                model.saldo_by_flat.cursor.sal_penalties_old = peni.previous.toFixed(2);
                
                model.save();
            }
        }
    };
    
//    self.Recalc(139187291174888, null, 137517637493759, 139462837304873, 5.9, 138408451811751);
}
