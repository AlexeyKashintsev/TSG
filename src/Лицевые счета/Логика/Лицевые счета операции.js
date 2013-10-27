/**
 * 
 * @author Alexey
 * @name moduleLC
 * @public
 */

var modSalSum = new ServerModule('moduleSaldoAndSums');
    modSalSum.modLC = this;

function saveChanges(){
    model.save();
    if (modSalSum.model.modified)
        modSalSum.saveChanges();
}

/*
 * Добавить новый лицевой счет
 * @param {type} aLCRegTo
 * @param {type} aLCNumber
 * @param {type} aLCPeopleRegCount
 * @param {type} aGroupID
 * @returns {@exp;dsFlat@pro;lc_flat_id}
 */
function addNewLC(aLCRegTo, aLCNumber, aLCPeopleRegCount, aGroupID){
//    dsFlat.requery();
    if (!parDateID) {
        all_dates.last();
        parDateID = all_dates.per_date_id;}
    dsFlat.insert(dsFlat.md.lc_flatnumber, aLCNumber, 
                  dsFlat.md.lc_regto, aLCRegTo,
                  dsFlat.md.registered_count, aLCPeopleRegCount);
    if (aGroupID) addFlat2Group(dsFlat.lc_flat_id, aGroupID);
    model.save();
    return dsFlat.lc_flat_id;
}

/*
 * Добавить лицевой счет в квартиру
 * @param {type} aFlatID
 * @param {type} aGroupID
 * @returns {undefined}
 * todo_: переделать под асинхронную модель
 * done: переделал 
 */

function addFlat2Group(aFlatID, aGroupID){
   // var dsTempLCGrp = model.loadEntity('qLCInGroups');
   // dsTempLCGrp.params.Group_ID = aGroupID;
   // dsTempLCGrp.requery(
   //     function(){
            dsLCGrp.params.Group_ID = aGroupID;
            dsLCGrp.requery();
            
            if (dsLCGrp.find(dsLCGrp.md.lc_id, aFlatID).length == 0){
                dsLCGrp.insert( dsLCGrp.md.lc_id, aFlatID,
                                dsLCGrp.md.group_id, aGroupID);
            }
            insertGroupCharsLC.params.FlatID = aFlatID;
            insertGroupCharsLC.params.GroupID = aGroupID;
            insertGroupCharsLC.execute();
            insertGroupCharsLC.beforeFirst();
            while (insertGroupCharsLC.next())
                addCharToLC(aFlatID, insertGroupCharsLC.grp_char_type, null);

            insertGroupServicesLC.params.FlatID = aFlatID;
            insertGroupServicesLC.params.GroupID = aGroupID;
            insertGroupServicesLC.execute();
            insertGroupServicesLC.beforeFirst();
            while (insertGroupServicesLC.next())
                addServiceToLC(aFlatID, insertGroupServicesLC.services_id,
                               insertGroupServicesLC.calc_by_counter, parDateID);
        //});
}

/*
 * Добавить характеристику к квартире
 * @param {type} aLC_ID
 * @param {type} aCharID
 * @param {type} aCharValue
 * @returns {@exp;dsCharsFlat@pro;lc_chars_id}
 * todo: переделать под асинхронную модель, добавить поиск характеристики
 */
function addCharToLC(aLC_ID, aCharID, aCharValue){
    dsCharsFlat.params.flat_id = aLC_ID;
    dsCharsFlat.requery();//function(){
        var foundedChars = dsCharsFlat.find(dsCharsFlat.md.lc_char_type, aCharID);
        if (foundedChars.length == 0){
            dsCharsFlat.insert( dsCharsFlat.md.lc_id, aLC_ID,
                                dsCharsFlat.md.lc_char_type, aCharID,
                                dsCharsFlat.md.lc_char_val, aCharValue);
            return dsCharsFlat.lc_chars_id;}
        else{
            dsCharsFlat.scrollTo(dsCharsFlat.findById(foundedChars[0].lc_chars_id))
            if (aCharValue) dsCharsFlat.lc_char_val = aCharValue;
            return foundedChars[0].lc_chars_id;
        }
    //});
}

/*
 * Добавить услугу в квартиру
 * @param {type} aFlatID
 * @param {type} aServiceID
 * @param {type} aCalcByCounter
 * @param {type} aDateID
 * @returns {@exp;services_by_flat@pro;lc_flat_services_id}
 * todo: добавить поиск услуги, добавить добавление значений(sums_perFlat)
 *       в модуле moduleSaldoAndSums
 *       и отслеживать эти дополнения, чтобы сохранять их тоже */

function addServiceToLC(aFlatID, aServiceID, aCalcByCounter, aDateID){
    services_by_flat.insert(services_by_flat.md.services_id, aServiceID,
                            services_by_flat.md.lc_id, aFlatID,
                            services_by_flat.md.fs_active, true);
    var newDate = aDateID?aDateID:(parDateID?parDateID:false);
    if (newDate) sums_perFlat.insert(sums_perFlat.md.flat_service_id, services_by_flat.lc_flat_services_id,
                                     sums_perFlat.md.date_id, newDate);
    if (aCalcByCounter) addCounterToFlat(services_by_flat.lc_flat_services_id);
    return services_by_flat.lc_flat_services_id;
}

/*
 * Добавить счетчик в квартиру
 * @param {type} aFlatService
 * @returns {@exp;dsCountersByFlat@pro;lc_counter_id} 
 */
function addCounterToFlat(aFlatService){
    dsCountersByFlat.insert(dsCountersByFlat.md.flat_serv_id, aFlatService,
                            dsCountersByFlat.md.counter_active, true);
    return dsCountersByFlat.lc_counter_id;
}


function getCouterInFlat(aFlatID, aServiceID){
    dsCountersByFlat.params.flat_id = aFlatID;
    dsCountersByFlat.execute();
    try{
        return dsCountersByFlat.find(dsCountersByFlat.md.services_id, aServiceID)[0].lc_counter_id
    } catch (e) {
        return null;
    };
}

/*
 * Удаление лицевого счета
 * to do: subj
 */
function deleteLC(aLC_ID){
    
}