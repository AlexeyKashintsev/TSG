/**
 * 
 * @author Alexey
 * @name CountersModule
 */

function CountersModule() {


var self = this;

var filterCounterValues = null;

function checkModified(){
    if (self.model.modified)
        self.model.save();
}

function addNewCounter(aCntActive, aCntNumber, aCntType){
    self.dsCounterByID.insert(   self.dsCounterByID.md.cnt_type, aCntType?aCntType:"FC",
                            self.dsCounterByID.md.cnt_active, aCntActive?aCntActive:true,
                            self.dsCounterByID.md.cnt_number, aCntNumber?aCntNumber:null);
    self.model.save();
    return self.dsCounterByID.cnt_counters_id;
}

function addCounter2Service(aCounter, aFlatService, aGroupService){
    self.dsCountersByFlat.insert(self.dsCountersByFlat.md.counter_id, aCounter,
                            self.dsCountersByFlat.md.flat_service, aFlatService,
                            self.dsCountersByFlat.md.group_service, aGroupService);
    return self.dsCountersByFlat.cnt_con2services_id;
}

function getFlatService(aFlatID, aServiceID){
    self.dsFlatServiceByServiceAndFlatID.params.LC_ID = aFlatID;
    self.dsFlatServiceByServiceAndFlatID.params.ServiceID = aServiceID;
    self.dsFlatServiceByServiceAndFlatID.execute();
    return self.dsFlatServiceByServiceAndFlatID.lc_flat_services_id;
}

function getCouterInFlat(aFlatID, aServiceID){
    checkModified();
    self.dsCountersByFlat.params.flat_id = aFlatID;
    self.dsCountersByFlat.execute();
    try{
        return self.dsCountersByFlat.find(self.dsCountersByFlat.md.services_id, aServiceID)[0].counter_id;
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
    self.dsCountersValues.params.counterID = aCounterID;
    self.dsCountersValues.params.dateID = aDateID;
    self.dsCountersValues.execute();
    if (self.dsCountersValues.length == 0){
        self.dsCountersValues.insert(self.dsCountersValues.md.counter_id, aCounterID,
                                self.dsCountersValues.md.date_id, aDateID,
                                self.dsCountersValues.md.beg_val, aBegValue,
                                self.dsCountersValues.md.end_val, aEndValue);
    } else {
        self.dsCountersValues.beg_val = aBegValue;
        self.dsCountersValues.end_val = aEndValue;
    }
    self.model.save();
    return true;
}
}