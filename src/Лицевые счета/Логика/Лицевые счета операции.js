/**
 * 
 * @author Alexey
 * @name moduleLC
 * @public
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

function addFlat2Group(aFlatID, aGroupID){
    parGroupID = aGroupID;
    if (dsLCGrp.find(dsLCGrp.md.lc_id, aFlatID).length == 0){
        dsLCGrp.insert( dsLCGrp.md.lc_id, aFlatID,
                        dsLCGrp.md.group_id, aGroupID);
    }
    insertGroupCharsLC.params.FlatID = aFlatID;
    insertGroupCharsLC.params.GroupID = aGroupID;
    insertGroupCharsLC.execute();
    insertGroupCharsLC.beforeFirst();
    while (insertGroupCharsLC.next())
        chars_flat.insert(chars_flat.md.lc_char_type, insertGroupCharsLC.grp_char_type,
                          chars_flat.md.lc_id, aFlatID);
    
    insertGroupServicesLC.params.FlatID = aFlatID;
    insertGroupServicesLC.params.GroupID = aGroupID;
    insertGroupServicesLC.execute();
    insertGroupServicesLC.beforeFirst();
    while (insertGroupServicesLC.next())
        addServiceToLC(aFlatID, insertGroupServicesLC.services_id,
                       insertGroupServicesLC.calc_by_counter, parDateID);
}

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

function addCounterToFlat(aFlatService){
    dsCountersByFlat.insert(dsCountersByFlat.md.flat_serv_id, aFlatService,
                            dsCountersByFlat.md.counter_active, true);
    return dsCountersByFlat.lc_counter_id;
}

function insertCounterValue(aCounterID, aDateID, aBegValue, aEndValue){
    dsCountersValues.insert(dsCountersValues.md.counter_id, aCounterID,
                            dsCountersValues.md.date_id, aDateID,
                            dsCountersValues.md.beg_val, aBegValue,
                            dsCountersValues.md.end_val, aEndValue);
}

function returnAny(abc){
    return abc;
}