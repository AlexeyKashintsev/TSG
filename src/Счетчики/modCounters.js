/**
 * 
 * @author Alexey
 * @name CountersModule
 */

function CountersModule() {


var self = this;

var filterCounterValues = null;

self.checkModified = function(){
    if (self.model.modified)
        self.model.save();
};

self.addNewCounter = function(aCntActive, aCntNumber, aCntType){
    self.dsCounterByID.insert(   self.dsCounterByID.md.cnt_type, aCntType?aCntType:"FC",
                            self.dsCounterByID.md.cnt_active, aCntActive?aCntActive:true,
                            self.dsCounterByID.md.cnt_number, aCntNumber?aCntNumber:null);
    return self.dsCounterByID.cnt_counters_id;
};

self.addCounter2Service = function(aCounter, aFlatService, aGroupService, aDepended){
    self.model.dsCountersByFlat.insert(  self.model.dsCountersByFlat.schema.counter_id, aCounter,
                                        self.model.dsCountersByFlat.md.flat_service, aFlatService?aFlatService:null,
                                        self.model.dsCountersByFlat.md.group_service, aGroupService?aGroupService:null,
                                        self.model.dsCountersByFlat.md.main_service, aDepended?false:true);
    return self.model.dsCountersByFlat.cnt_con2services_id;
};

self.getFlatService = function(aFlatID, aServiceID){
    self.dsFlatServiceByServiceAndFlatID.params.LC_ID = aFlatID;
    self.dsFlatServiceByServiceAndFlatID.params.ServiceID = aServiceID;
    self.dsFlatServiceByServiceAndFlatID.execute();
    return self.dsFlatServiceByServiceAndFlatID.lc_flat_services_id;
};

self.getCounterInFlat = function(aFlatID, aServiceID){
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
};

self.setCounterValueByLCAndService = function(aLC_ID, aServiceID, aDateID, aBegValue, aEndValue){
    var counter = getCounterInFlat(aLC_ID, aServiceID);
    setCounterValueByCounterValueID(counter, aDateID, aBegValue, aEndValue);
};

self.setCounterValueByCounterValueID = function(aCounterID, aDateID, aBegValue, aEndValue){
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
};

var checkModified = self.checkModified;
var addNewCounter = self.addNewCounter;
var addCounter2Service = self.addCounter2Service;
var getCounterInFlat = self.getCounterInFlat;
var getFlatService = self.getFlatService;
var setCounterValueByLCAndService = self.setCounterValueByLCAndService;
var setCounterValueByCounterValueID = self.setCounterValueByCounterValueID;
}