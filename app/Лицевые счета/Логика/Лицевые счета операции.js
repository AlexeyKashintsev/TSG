/**
 * 
 * @author Alexey
 * @name LCModule
 * @public
 * @module
 */

function LCModule() {


    var self = this, model = self.model;

    var modSN = null;
    var modCN = null;
    var modDT = new DateModule();

    // modSalSum.modLC = this;
    self.setServModules = function(aModSN, aModCN) {
        modSN = aModSN;
        modCN = aModCN;
    };

    self.saveChanges = function() {
        self.model.save();
        if (modSN && modSN.model.modified)
            modSN.saveChanges();
        if (modCN && modCN.model.modified)
            modCN.checkModified();
    };

    self.getLcID = function(aLCRegTo, aLCFlatNumber, aLCPeopleRegCount, aLCNumber) {
        model.dsFlatByNumberAndRegister.params.flatNumber = aLCFlatNumber;
        model.dsFlatByNumberAndRegister.params.regTo = aLCRegTo;
        model.dsFlatByNumberAndRegister.execute();
        if (model.dsFlatByNumberAndRegister.length === 1) {
            return model.dsFlatByNumberAndRegister.cursor.lc_flat_id;
        } else
            return null;
    };

    /*
     * Добавить новый лицевой счет
     * @param {type} aLCRegTo
     * @param {type} aLCNumber
     * @param {type} aLCPeopleRegCount
     * @param {type} aGroupID
     * @returns {@exp;dsFlat@pro;lc_flat_id}
     */
    self.addNewLC = function(aLCRegTo, aLCFlatNumber, aLCPeopleRegCount, aLCNumber) {//, aGroupID, aGroupModifiers){
//    self.dsFlat.requery();
        if (!self.parDateID) {
            self.all_dates.last();
            self.parDateID = self.all_dates.per_date_id;
        }
        self.dsFlat.insert(self.dsFlat.schema.lc_flatnumber, aLCFlatNumber,
                self.dsFlat.schema.lc_regto, aLCRegTo,
                self.dsFlat.schema.registered_count, aLCPeopleRegCount,
                self.dsFlat.schema.lc_num, aLCNumber);
        //if (aGroupID) addFlat2Group(self.dsFlat.lc_flat_id, aGroupID);
        saveChanges();
        return self.dsFlat.lc_flat_id;
    };

    /*
     * Добавить лицевой счет в квартиру
     * @param {type} aFlatID
     * @param {type} aGroupID
     * @returns {undefined}
     * todo_: переделать под асинхронную модель
     * done: переделал 
     */
    self.addFlat2Group = function(aFlatID, aGroupID, aGroupModifiers) {
        // var dsTempLCGrp = self.model.loadEntity('qLCInGroups');
        // dsTempLCGrp.params.Group_ID = aGroupID;
        // dsTempLCGrp.requery(
        //     function(){
        self.dsLCGrp.params.Group_ID = aGroupID;
        self.dsLCGrp.execute();

        if (self.dsLCGrp.find(self.dsLCGrp.schema.lc_id, aFlatID).length === 0) {
            self.dsLCGrp.insert(self.dsLCGrp.schema.lc_id, aFlatID,
                    self.dsLCGrp.schema.group_id, aGroupID);
        }

        self.insertGroupCharsLC.params.FlatID = aFlatID;
        self.insertGroupCharsLC.params.GroupID = aGroupID;
        self.insertGroupCharsLC.execute();
        self.insertGroupCharsLC.beforeFirst();
        while (self.insertGroupCharsLC.next())
            addCharToLC(aFlatID, self.insertGroupCharsLC.grp_char_type, null);

        self.insertGroupServicesLC.params.FlatID = aFlatID;
        self.insertGroupServicesLC.params.GroupID = aGroupID;
        self.insertGroupServicesLC.execute();
        self.insertGroupServicesLC.beforeFirst();
        while (self.insertGroupServicesLC.next())
            addServiceToLC(aFlatID, self.insertGroupServicesLC.services_id,
                    self.insertGroupServicesLC.calc_by_counter, self.parDateID);
        //});
        saveChanges();
    };

    self.addFlat2ModifyingGroup = function(aFlatID, aGroupID, aModServices) {
        self.services_by_group.params.parGroup = aGroupID;
        self.services_by_group.requery();
        if (!aModServices)
            aModServices = [];
        self.services_by_group.forEach(function(modServ) {
            if (modServ.modified_service_id) {
                aModServices[modServ.modified_service_id] = modServ.services_id;
                self.set_service_in_flat.params.flatid = aFlatID;
                self.set_service_in_flat.params.service_id = modServ.modified_service_id;
                self.set_service_in_flat.params.new_Service = modServ.services_id;
                self.set_service_in_flat.executeUpdate();
            }
            else
                addServiceToLC(aFlatID, modServ.services_id, modServ.calc_by_counter, self.parDateID);

        });
        self.dsLCGrp.insert(self.dsLCGrp.schema.lc_id, aFlatID,
                self.dsLCGrp.schema.group_id, aGroupID);
        return aModServices;
    };

    self.addFlat2Modifyers = function(aFlatID, aGroupModifiers) {
        var modServices = [];
        if (aGroupModifiers) {
            for (var i in aGroupModifiers) {
                modServices = self.addFlat2ModifyingGroup(aFlatID, aGroupModifiers[i], modServices);
            }
        }
        saveChanges();
        return modServices;
    };

    /*
     * Добавить характеристику к квартире
     * @param {type} aLC_ID
     * @param {type} aCharID
     * @param {type} aCharValue
     * @returns {@exp;dsCharsFlat@pro;lc_chars_id}
     * todo: переделать под асинхронную модель, добавить поиск характеристики
     */
    self.addCharToLC = function(aLC_ID, aCharID, aCharValue) {
        self.dsCharsFlat.params.flat_id = aLC_ID;
        self.dsCharsFlat.requery();//function(){
        var foundedChars = self.dsCharsFlat.find(self.dsCharsFlat.schema.lc_char_type, aCharID);
        if (foundedChars.length === 0) {
            self.dsCharsFlat.insert(self.dsCharsFlat.schema.lc_id, aLC_ID,
                    self.dsCharsFlat.schema.lc_char_type, aCharID,
                    self.dsCharsFlat.schema.lc_char_val, aCharValue);
            return self.dsCharsFlat.lc_chars_id;
        }
        else {
            if (foundedChars[0].lc_char_val != aCharValue)
                self.dsCharsFlat.scrollTo(foundedChars[0]);
            self.dsCharsFlat.lc_char_val = aCharValue;
        }
        return foundedChars[0].lc_chars_id;
    };
    //});


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
    self.addServiceToLC = function(aFlatID, aServiceID, aCalcByCounter, aDateID, aAccountID, aStopDate, aStartPeriod, aEndPeriod, grpCount) {
        var startDate = aDateID ? aDateID : modDT.getLastDate();
        model.services_by_flat.params.flat_id = aFlatID;
        model.services_by_flat.params.parAccount = aAccountID;
        model.services_by_flat.requery();
        if (model.services_by_flat.find(model.services_by_flat.schema.services_id, aServiceID).length === 0) {
            model.services_by_flat.push({
                services_id : aServiceID,
                lc_id       : aFlatID,
                fs_active   : true,
                date_start  : startDate,
                date_end    : aStopDate ? aStopDate : null,
                period_start: aStartPeriod ? aEndPeriod : null,
                period_end  : aEndPeriod ? aEndPeriod : null,
                account_id  : aAccountID
            });
            var fs = self.services_by_flat.lc_flat_services_id;
            if (startDate)
                model.sums_perFlat.push({
                    flat_service_id : self.services_by_flat.lc_flat_services_id,
                    date_id         : startDate
                });
            if (!processIfConnectedService(fs, aServiceID, aFlatID,aAccountID) && aCalcByCounter) {
                var cnt = addCounterToFlat(self.services_by_flat.lc_flat_services_id, grpCount);
                modCN.setCounterValueByCounterValueID(cnt, startDate, 0, 0);
            }            
        }
        return self.services_by_flat.lc_flat_services_id;
    };

    /*
     * Добавить счетчик в квартиру
     * @param {type} aFlatService
     * @returns {@exp;dsCountersByFlat@pro;lc_counter_id} 
     */
    self.addCounterToFlat = function(aFlatService, grpCount) {
        if (!modCN)
            modCN = new CountersModule();
        var cnt = modCN.addNewCounter();
        modCN.addCounter2Service(cnt, aFlatService, grpCount);
        return cnt;
    };

    self.processIfConnectedService = function(aFlatService, aService, aFlatID, anAccountID) {
        var conServ = model.qServices.find(model.qServices.schema.usl_services_id, aService);
        if (conServ) conServ = conServ[0].connected_service;
        if (conServ) {
            if (!modCN)
                modCN = new CountersModule();
            var cnt = modCN.getCounterInFlat(aFlatID, conServ, anAccountID);
            modCN.addCounter2Service(cnt, aFlatService, null, true);
        }
        self.saveChanges();
        return conServ;
    };

    /*
     * Удаление лицевого счета
     * to do: subj
     */
    function deleteLC(aLC_ID) {

    }
    
    self.addSaldoToLC = function(aFlatID, aAccountID){
        if (!self.parDateID) {
            self.all_dates.last();
            self.parDateID = self.all_dates.per_date_id;
        }
        model.saldo_by_flat.push({
            lc_id       : aFlatID,
            date_id     : self.parDateID,
            sal_begin   : 0,
            account_id  : aAccountID
        });
    }

    var saveChanges = self.saveChanges;
    var addFlat2Group = self.addFlat2Group;
    var addNewLC = self.addNewLC;
    var addCharToLC = self.addCharToLC;
    var addServiceToLC = self.addServiceToLC;
    var addCounterToFlat = self.addCounterToFlat;
    var processIfConnectedService = self.processIfConnectedService;
}