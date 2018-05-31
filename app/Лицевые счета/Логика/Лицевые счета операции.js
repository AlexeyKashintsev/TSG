/**
 * 
 * @author Alexey
 * @name LCModule
 * @public
 * @module
 */

function LCModule() {
    var self = this, model = self.model;
    var modLCServ = new LCServicesAnCounters();

    self.setServModules = function(aModSN, aModCN) {
        modLCServ.setServModules(aModCN);
    };

    self.saveChanges = function() {
        model.save();
        modLCServ.saveChanges();
    };

    self.getLcID = function(aLCRegTo, aLCFlatNumber, aLCPeopleRegCount, aLCNumber) {
        model.dsFlatByNumberAndRegister.params.flatNumber = aLCFlatNumber.toString();
        model.dsFlatByNumberAndRegister.params.regTo = aLCRegTo.toString();
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
    self.addNewLC = function(aLCRegTo, aLCFlatNumber, aLCPeopleRegCount, aLCNumber, aGroupID, aGroupModifiers){
//    model.dsFlat.requery();
        if (!model.params.parDateID) {
            model.all_dates.last();
            model.params.parDateID = model.all_dates.per_date_id;
        }
        model.dsFlat.push({
            lc_flatnumber: aLCFlatNumber ? aLCFlatNumber : null,
            lc_regto: aLCRegTo ? aLCRegTo : null,
            registered_count: aLCPeopleRegCount ? aLCPeopleRegCount : null,
            lc_num: aLCNumber ? aLCNumber : null
        });
        model.save();
        if (aGroupID) addFlat2Group(model.dsFlat.lc_flat_id, aGroupID);
        return model.dsFlat.lc_flat_id;
    };

    /*
     * Добавить лицевой счет в квартиру
     * @param {type} aFlatID
     * @param {type} aGroupID
     * @returns {undefined}
     * todo_: переделать под асинхронную модель
     * done: переделал 
     */
    self.addFlat2Group = function(aFlatID, aGroupID, aGroupModifiers, anAccountId) {
        // var dsTempLCGrp = self.model.loadEntity('qLCInGroups');
        // dsTempLCGrp.params.Group_ID = aGroupID;
        // dsTempLCGrp.requery(
        //     function(){
        model.dsLCGrp.params.Group_ID = aGroupID;
        model.dsLCGrp.execute();

        if (model.dsLCGrp.find(model.dsLCGrp.schema.lc_id, aFlatID).length === 0) {
            model.dsLCGrp.insert(model.dsLCGrp.schema.lc_id, aFlatID,
                    model.dsLCGrp.schema.group_id, aGroupID);
        }

        model.insertGroupCharsLC.params.FlatID = aFlatID;
        model.insertGroupCharsLC.params.GroupID = aGroupID;
        model.insertGroupCharsLC.execute();
        model.insertGroupCharsLC.forEach(function(cursor) {
            addCharToLC(aFlatID, cursor.grp_char_type, null);
        });
        
        model.insertGroupServicesLC.params.FlatID = aFlatID;
        model.insertGroupServicesLC.params.GroupID = aGroupID;
        model.insertGroupServicesLC.execute();
        model.insertGroupServicesLC.forEach(function(cursor) {
            addServiceToLC(aFlatID, cursor.services_id, false, model.params.parDateID
                    , anAccountId ? anAccountId : cursor.account_id
                    , null, null, null, cursor.grp_services_id);
        });
        saveChanges();
    };

    self.addFlat2ModifyingGroup = function(aFlatID, aGroupID, aModServices) {
        model.services_by_group.params.parGroup = aGroupID;
        model.services_by_group.requery();
        if (!aModServices)
            aModServices = [];
        model.services_by_group.forEach(function(modServ) {
            if (modServ.modified_service_id) {
                aModServices[modServ.modified_service_id] = modServ.services_id;
                model.set_service_in_flat.params.flatid = aFlatID;
                model.set_service_in_flat.params.service_id = modServ.modified_service_id;
                model.set_service_in_flat.params.new_Service = modServ.services_id;
                model.set_service_in_flat.executeUpdate();
            }
            else
                addServiceToLC(aFlatID, modServ.services_id, modServ.calc_by_counter, model.params.parDateID);

        });
        model.dsLCGrp.insert(model.dsLCGrp.schema.lc_id, aFlatID,
                model.dsLCGrp.schema.group_id, aGroupID);
        return aModServices;
    };

    self.addFlat2Modifiers = function(aFlatID, aGroupModifiers) {
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
        model.dsCharsFlat.params.flat_id = aLC_ID;
        model.dsCharsFlat.requery();//function(){
        var foundedChars = model.dsCharsFlat.find(model.dsCharsFlat.schema.lc_char_type, aCharID);
        if (foundedChars.length === 0) {
            model.dsCharsFlat.insert(model.dsCharsFlat.schema.lc_id, aLC_ID,
                    model.dsCharsFlat.schema.lc_char_type, aCharID,
                    model.dsCharsFlat.schema.lc_char_val, aCharValue);
            return model.dsCharsFlat.lc_chars_id;
        }
        else {
            if (foundedChars[0].lc_char_val != aCharValue)
                model.dsCharsFlat.scrollTo(foundedChars[0]);
            model.dsCharsFlat.lc_char_val = aCharValue;
        }
        return foundedChars[0].lc_chars_id;
    };
    //});

    /*
     * Удаление лицевого счета
     * to do: subj
     */
    function deleteLC(aLC_ID) {

    }
    
    self.addSaldoToLC = function(aFlatID, aAccountID){
        if (!model.params.parDateID) {
            model.all_dates.last();
            model.params.parDateID = model.all_dates.per_date_id;
        }
        model.saldo_by_flat.push({
            lc_id       : aFlatID,
            date_id     : model.params.parDateID,
            sal_begin   : 0,
            account_id  : aAccountID
        });
    };

    var saveChanges = self.saveChanges;
    var addFlat2Group = self.addFlat2Group;
    var addNewLC = self.addNewLC;
    var addCharToLC = self.addCharToLC;
    var addServiceToLC = modLCServ.addServiceToLC;
    self.addServiceToLC = addServiceToLC;
    var addCounterToFlat = modLCServ.addCounterToFlat;
    self.addCounterToFlat = addCounterToFlat;
    var processIfConnectedService = self.processIfConnectedService;
    self.processIfConnectedService = processIfConnectedService;
}