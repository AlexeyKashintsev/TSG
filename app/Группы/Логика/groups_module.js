/**
 * 
 * @name groups_module
 * @author User
 * @stateless
 * @public 
 * @module
 */
function groups_module() {
    var self = this, model = this.model;
    
    self.addService2Flats = function(aGroupID, aServiceID, aDateID, aAccountID){
        var modLC = new ServerModule('LCModule');
        var calcByCnt = false;
        try {
            calcByCnt = model.qServices.findById(aServiceID).calc_by_counter;
        } catch (e) {}
        if (!aDateID){
            model.all_dates.last();
            aDateID = model.all_dates.per_date_id;
        }
        model.flats_by_group.params.group_id = aGroupID;
        model.flats_by_group.requery(function(){
            model.flats_by_group.forEach(function(aFlat){
               modLC.addServiceToLC(aFlat.lc_flat_id, aServiceID, calcByCnt, aDateID, aAccountID); 
            });
            modLC.saveChanges();
        });
    };
    
    self.deleteServiceFromFlats = function(aGroupID, aServiceID, doDeleteSums, aDateID){
        
    };
    
    self.addSaldo2Flats = function(aGroupID, aAccountID){
        var modLC = new ServerModule('LCModule');
        model.flats_by_group.params.group_id = aGroupID;
        model.flats_by_group.requery(function(){
            model.flats_by_group.forEach(function(aFlat){
               modLC.addSaldoToLC(aFlat.lc_flat_id, aAccountID); 
            });
            modLC.saveChanges();
        });
    }
}
