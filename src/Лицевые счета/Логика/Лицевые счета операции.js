/**
 * 
 * @author Alexey
 * @name LCModule
 * @public
 * @module
 */

function LCModule() {


var self = this;

var modSN = null;
var modCN = null;
   // modSalSum.modLC = this;
self.setServModules = function(aModSN, aModCN){
    modSN = aModSN;
    modCN = aModCN;
};

self.saveChanges = function(){
    self.model.save();
    if (modSN&&modSN.model.modified)
        modSN.saveChanges();
    if (modCN&&modCN.model.modified)
        modCN.checkModified();
};

/*
 * Добавить новый лицевой счет
 * @param {type} aLCRegTo
 * @param {type} aLCNumber
 * @param {type} aLCPeopleRegCount
 * @param {type} aGroupID
 * @returns {@exp;dsFlat@pro;lc_flat_id}
 */
self.addNewLC = function(aLCRegTo, aLCFlatNumber, aLCPeopleRegCount, aLCNumber){//, aGroupID, aGroupModifiers){
//    self.dsFlat.requery();
    if (!self.parDateID) {
        self.all_dates.last();
        self.parDateID = self.all_dates.per_date_id;}
    self.dsFlat.insert(self.dsFlat.md.lc_flatnumber, aLCFlatNumber, 
                  self.dsFlat.md.lc_regto, aLCRegTo,
                  self.dsFlat.md.registered_count, aLCPeopleRegCount,
                  self.dsFlat.md.lc_num, aLCNumber);
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
self.addFlat2Group = function(aFlatID, aGroupID, aGroupModifiers){
   // var dsTempLCGrp = self.model.loadEntity('qLCInGroups');
   // dsTempLCGrp.params.Group_ID = aGroupID;
   // dsTempLCGrp.requery(
   //     function(){
            self.dsLCGrp.params.Group_ID = aGroupID;
            self.dsLCGrp.execute();
            
            if (self.dsLCGrp.find(self.dsLCGrp.md.lc_id, aFlatID).length == 0){
                self.dsLCGrp.insert( self.dsLCGrp.md.lc_id, aFlatID,
                                self.dsLCGrp.md.group_id, aGroupID);
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

self.addFlat2ModifyingGroup = function(aFlatID, aGroupID, aModServices){    
    self.services_by_group.params.parGroup = aGroupID;
    self.services_by_group.requery();
    self.services_by_group.forEach(function(modServ){
        if (modServ.modified_service_id){
            aModServices[modServ.modified_service_id] = modServ.services_id;
            self.set_service_in_flat.params.flatid = aFlatID;
            self.set_service_in_flat.params.service_id = modServ.modified_service_id;
            self.set_service_in_flat.params.new_Service = modServ.services_id;
            self.set_service_in_flat.executeUpdate();
        }
        else
            addServiceToLC(aFlatID, modServ.services_id, modServ.calc_by_counter, self.parDateID);

    });
    self.dsLCGrp.insert(self.dsLCGrp.md.lc_id, aFlatID,
                        self.dsLCGrp.md.group_id, aGroupID);
    return aModServices;
};

self.addFlat2Modifyers = function(aFlatID, aGroupModifiers){
    var modServices = [];
    if (aGroupModifiers) {
        for (var i in aGroupModifiers){
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
self.addCharToLC = function(aLC_ID, aCharID, aCharValue){
    self.dsCharsFlat.params.flat_id = aLC_ID;
    self.dsCharsFlat.requery();//function(){
        var foundedChars = self.dsCharsFlat.find(self.dsCharsFlat.md.lc_char_type, aCharID);
        if (foundedChars.length == 0){
            self.dsCharsFlat.insert( self.dsCharsFlat.md.lc_id, aLC_ID,
                                self.dsCharsFlat.md.lc_char_type, aCharID,
                                self.dsCharsFlat.md.lc_char_val, aCharValue);
            return self.dsCharsFlat.lc_chars_id;}
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
self.addServiceToLC = function(aFlatID, aServiceID, aCalcByCounter, aDateID){
    self.services_by_flat.insert(   self.services_by_flat.md.services_id, aServiceID,
                                    self.services_by_flat.md.lc_id, aFlatID,
                                    self.services_by_flat.md.fs_active, true);
    var fs = self.services_by_flat.lc_flat_services_id;
    
    var newDate = aDateID?aDateID:(self.parDateID?self.parDateID:false);
    if (newDate) self.sums_perFlat.insert(self.sums_perFlat.md.flat_service_id, self.services_by_flat.lc_flat_services_id,
                                     self.sums_perFlat.md.date_id, newDate);
    if (!processIfConnectedService(fs, aServiceID, aFlatID)&&aCalcByCounter) 
        addCounterToFlat(self.services_by_flat.lc_flat_services_id);
    return self.services_by_flat.lc_flat_services_id;
};

/*
 * Добавить счетчик в квартиру
 * @param {type} aFlatService
 * @returns {@exp;dsCountersByFlat@pro;lc_counter_id} 
 */
self.addCounterToFlat = function(aFlatService){
    if (!modCN) modCN = new CountersModule();
    var cnt = modCN.addNewCounter();
    modCN.addCounter2Service(cnt, aFlatService, null);
    return cnt;
};

self.processIfConnectedService = function(aFlatService, aService, aFlatID){
    var conServ = self.model.qServices.findById(aService).connected_service;
    if (conServ) {
        if (!modCN) modCN = new CountersModule();
        var cnt = modCN.getCounterInFlat(aFlatID, conServ);
        modCN.addCounter2Service(cnt, aFlatService, null, true);
    }
    self.saveChanges();
    return conServ;
};

/*
 * Удаление лицевого счета
 * to do: subj
 */
function deleteLC(aLC_ID){
    
}

var saveChanges = self.saveChanges;
var addFlat2Group = self.addFlat2Group;
var addNewLC = self.addNewLC;
var addCharToLC  = self.addCharToLC;
var addServiceToLC = self.addServiceToLC;
var addCounterToFlat = self.addCounterToFlat;
var processIfConnectedService = self.processIfConnectedService;
}