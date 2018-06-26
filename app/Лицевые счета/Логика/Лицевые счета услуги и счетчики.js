/**
 * 
 * @name LCServicesAnCounters
 * @author Alexey
 * @module
 */ 
function LCServicesAnCounters() {
    var self = this, model = this.model;
    var modCN = null;
    var modDT = new DateModule();
    var modGRP = new GroupsModule();
    
    self.setServModules = function(aModCN) {
        modCN = aModCN;
    };
    
    self.saveChanges = function() {
        model.save();
        if (modCN)
            modCN.checkModified();
    };
    
    /*
     * Добавить услугу в квартиру
     * @param {type} aFlatID
     * @param {type} aServiceID
     * @param {type} aCalcByCounter
     * @param {type} aDateID
     * @returns {@exp;services_by_flat@pro;lc_flat_services_id}
     * todo: добавить поиск услуги, добавить добавление значений(self.sums_perFlat)
     *       в модуле SaldoAndSumsModule
     *       и отслеживать эти дополнения, чтобы сохранять их тоже */
    self.addServiceToLC = function(aFlatID, aServiceID, aDeprec1, aDateID
                                    , anAccountID, aStopDate, aStartPeriod, aEndPeriod
                                    , aGroupService) {
        var startDate = aDateID ? aDateID : modDT.getLastDate();
        model.services_by_flat.params.flat_id = aFlatID;
        model.services_by_flat.params.parAccount = anAccountID;
        model.services_by_flat.requery();
        if (model.services_by_flat.find(model.services_by_flat.schema.services_id, aServiceID).length === 0) {
            model.dsNewServicesByFlat.push({
                services_id : aServiceID,
                lc_id       : aFlatID,
                fs_active   : true,
                date_start  : startDate,
                date_end    : aStopDate ? aStopDate : null,
                period_start: aStartPeriod ? aEndPeriod : null,
                period_end  : aEndPeriod ? aEndPeriod : null,
                account_id  : anAccountID
            });
            var flatService = self.dsNewServicesByFlat.lc_flat_services_id;
            if (startDate)
                model.sums_perFlat.push({
                    flat_service_id : self.dsNewServicesByFlat.lc_flat_services_id,
                    date_id         : startDate
                });
            
            var grpCounters = modGRP.getGroupCounters(aGroupService);
            
            model.save();
            
            grpCounters.forEach(function(counter) {
                if (!counter.counterConCounter) {
                    self.addCounterToFlat(flatService, counter.counterId, aDateID, aFlatID);
                } else 
                    processIfConnectedService(aFlatID, flatService, counter.counterId, counter.counterConCounter);
            });
            
            /*if (!processIfConnectedService(fs, aServiceID, aFlatID, anAccountID) && aCalcByCounter) {
                var cnt = addCounterToFlat(self.services_by_flat.lc_flat_services_id, aGroupService);
                modCN.setCounterValueByCounterValueID(cnt, startDate, 0, 0);
            } */           
        }
        return self.services_by_flat.lc_flat_services_id;
    };
    
    self.updateServiceCounters = function(aFlatID, aGroupService, aDateID) {
            var grpCounters = modGRP.getGroupCounters(aGroupService);
            model.services_by_flat.params.flat_id = aFlatID;
            model.services_by_flat.params.groupService = aGroupService;
            model.services_by_flat.requery();
            grpCounters.forEach(function(counter) {
                if (!counter.counterConCounter) {
                    self.addCounterToFlat(model.services_by_flat.cursor.lc_flat_services_id, counter.counterId, aDateID, aFlatID);
                } else 
                    processIfConnectedService(aFlatID, model.services_by_flat.cursor.lc_flat_services_id, counter.counterId, counter.counterConCounter);
            });
    };
    
    var addedCounters = {};
    /*
     * Добавить счетчик в квартиру
     * @param {type} aFlatService
     * @returns {@exp;dsCountersByFlat@pro;lc_counter_id} 
     */
    self.addCounterToFlat = function(aFlatService, grpCount, aDateID, aFlatId) {
        if (!modCN)
            modCN = new CountersModule();
        var cnt = modCN.addNewCounter();
        if (aFlatId) {
            if (!addedCounters[aFlatId])
                addedCounters[aFlatId] = {};
            addedCounters[aFlatId][grpCount] = cnt;
        }
        modCN.addCounter2Service(cnt, aFlatService, grpCount);
        if (aDateID) modCN.setCounterValueByCounterValueID(cnt, aDateID, 0);
        return cnt;
    };

    function processIfConnectedService(aFlatId, aFlatService, aGroupCounter, aConnectedCounter) {
        if (!modCN)
            modCN = new CountersModule();
        var counter = addedCounters[aFlatId] ? 
                        addedCounters[aFlatId][aConnectedCounter] : 
                        modCN.getCounterInFlat(aFlatId, aConnectedCounter, null);
        if (counter)
            modCN.addCounter2Service(counter, aFlatService, aGroupCounter);
        /*var conServ = model.qServices.find(model.qServices.schema.usl_services_id, aService);
        if (conServ) conServ = conServ[0].connected_service;
        if (conServ) {
            if (!modCN)
                modCN = new CountersModule();
            var cnt = modCN.getCounterInFlat(aFlatID, conServ, anAccountID);
            modCN.addCounter2Service(cnt, aFlatService, null, true);
        }
        self.saveChanges();
        return conServ;*/
    };
}
