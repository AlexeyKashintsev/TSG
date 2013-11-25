/**
 * 
 * @author Alexey
 * @name CountersModule
 */
var filterCounterValues = null;

function checkModified(){
    if (model.modified)
        model.save();
}

function addNewCounter(aCntActive, aCntNumber, aCntType){
    dsCounterByID.insert(   dsCounterByID.md.cnt_type, aCntType?aCntType:"FC",
                            dsCounterByID.md.cnt_active, aCntActive?aCntActive:true,
                            dsCounterByID.md.cnt_number, aCntNumber?aCntNumber:null);
    model.save();
    return dsCounterByID.cnt_counters_id;
}

function addCounter2Service(aCounter, aFlatService, aGroupService){
    dsCountersByFlat.insert(dsCountersByFlat.md.counter_id, aCounter,
                            dsCountersByFlat.md.flat_service, aFlatService,
                            dsCountersByFlat.md.group_service, aGroupService);
    return dsCountersByFlat.cnt_con2services_id;
}

function getFlatService(aFlatID, aServiceID){
    dsFlatServiceByServiceAndFlatID.params.LC_ID = aFlatID;
    dsFlatServiceByServiceAndFlatID.params.ServiceID = aServiceID;
    dsFlatServiceByServiceAndFlatID.execute();
    return dsFlatServiceByServiceAndFlatID.lc_flat_services_id;
}

function getCouterInFlat(aFlatID, aServiceID){
    checkModified();
    dsCountersByFlat.params.flat_id = aFlatID;
    dsCountersByFlat.execute();
    try{
        return dsCountersByFlat.find(dsCountersByFlat.md.services_id, aServiceID)[0].counter_id;
    } catch (e) {
        var cnt = addNewCounter();
        var fs = getFlatService(aFlatID, aServiceID);
        addCounter2Service(cnt, fs, null);
        return cnt;
    };
}

function setCounterValueByLCAndService(aLC_ID, aServiceID, aDateID, aBegValue, aEndValue){
    var counter = getCouterInFlat(aLC_ID, aServiceID);
    setCounterValueByCounterValueID(counter, aDateID, aBegValue, aEndValue);
}

function setCounterValueByCounterValueID(aCounterID, aDateID, aBegValue, aEndValue){
    dsCountersValues.params.counterID = aCounterID;
    dsCountersValues.params.dateID = aDateID;
    dsCountersValues.execute();
    if (dsCountersValues.length == 0){
        dsCountersValues.insert(dsCountersValues.md.counter_id, aCounterID,
                                dsCountersValues.md.date_id, aDateID,
                                dsCountersValues.md.beg_val, aBegValue,
                                dsCountersValues.md.end_val, aEndValue);
    } else {
        dsCountersValues.beg_val = aBegValue;
        dsCountersValues.end_val = aEndValue;
    }
    model.save();
    return true;
}