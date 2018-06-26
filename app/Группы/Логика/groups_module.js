/**
 * 
 * @name GroupsModule
 * @author User
 * @stateless
 * @public 
 * @module
 */
function GroupsModule() {
    var self = this, model = this.model;
    
    self.addService2Flats = function(aGroupID, aServiceID, aDateID, anAccountID, aGroupServiceID){
        var modLC = new ServerModule('LCModule');
        if (!aDateID){
            model.all_dates.last();
            aDateID = model.all_dates.per_date_id;
        }
        model.flats_by_group.params.group_id = aGroupID;
        model.flats_by_group.requery(function(){//TODO Сделать синхронной
            model.flats_by_group.forEach(function(aFlat){
               modLC.addServiceToLC(aFlat.lc_flat_id, aServiceID, false, aDateID, anAccountID, null, null, null, aGroupServiceID);
            });
            modLC.saveChanges();
        });
    };
    
    self.deleteServiceFromFlats = function(aGroupID, aServiceID, doDeleteSums, aDateID){
        
    };
    
    self.updateCountersByService = function(aGroupID, aServiceID, aDateID, anAccountID, aGroupServiceID) {
        var modLC = new ServerModule('LCServicesAnCounters');
        if (!aDateID){
            model.all_dates.last();
            aDateID = model.all_dates.per_date_id;
        }
        model.flats_by_group.params.group_id = aGroupID;
        model.flats_by_group.requery(function(){//TODO Сделать синхронной
            model.flats_by_group.forEach(function(aFlat){
               modLC.updateServiceCounters(aFlat.lc_flat_id, aServiceID, false, aDateID, anAccountID, null, null, null, aGroupServiceID);
            });
            modLC.saveChanges();
        });
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
    };
    
    self.getGroupCounters = function(aGroupService, aServiceId, aGroupId) {
        if (aGroupService) {
            model.dsGrpServiceCounter.params.parGrpServ = aGroupService;
            model.dsGrpServiceCounter.requery();
        } else {
            //TODO Обработать aServiceId, aGroupId
        }
        
        var grpCounters = [];
        model.dsGrpServiceCounter.forEach(function(cursor) {
            grpCounters.push({
                counterId: cursor.grp_service_counters_id,
                counterName: cursor.counter_name,
                counterConCounter: cursor.con_grp_counter
            });
        });
        
        return grpCounters;
    };
}
