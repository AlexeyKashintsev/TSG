/**
 * 
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
            while (model.dsRecalc.next()) {
                model.dsRecalc.recalc = 
                        (model.dsRecalc.end_val - model.dsRecalc.beg_val) * aCost;
            }
            model.save();
        });
    };
    
    self.Recalc(139187291174888, null, 137517637493759, 139462837304873, 5.9, 138408451811751);
}
