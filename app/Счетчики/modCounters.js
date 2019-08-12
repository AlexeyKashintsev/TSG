/**
 * 
 * @name CountersModule
 * @author Alexey
 * @module
 * @public 
 * TODO non public
 */

function CountersModule() {


    var self = this, model = self.model;

    var filterCounterValues = null;

    self.checkModified = function() {
        if (model.modified)
            model.save();
    };

    self.addNewCounter = function(aCntActive, aCntNumber, aCntType) {
        model.dsCounterByID.push({
                cnt_type: aCntType ? aCntType : "FC",
                cnt_active: aCntActive ? aCntActive : true,
                cnt_number: aCntNumber ? aCntNumber : null
            });
        //model.save();
        return model.dsCounterByID.cnt_counters_id;
    };

    self.addCounter2Service = function(aCounter, aFlatService, aGroupService, aDepended) {
        model.dsNewCntCon.push({
                            counter_id: aCounter,
                            flat_service: aFlatService ? aFlatService : null,
                            group_counter: aGroupService ? aGroupService : null,
                            main_service: aDepended ? false : true
                        });
        return model.dsNewCntCon.cnt_con2flats_id;
    };

    self.getFlatService = function(aFlatID, aServiceID) {
        model.dsFlatServiceByServiceAndFlatID.params.LC_ID = aFlatID;
        model.dsFlatServiceByServiceAndFlatID.params.ServiceID = aServiceID;
        model.dsFlatServiceByServiceAndFlatID.execute();
        return model.dsFlatServiceByServiceAndFlatID.lc_flat_services_id;
    };

    self.getCounterInFlat = function(aFlatID, aServiceCounterID, anAccountID) {
        //checkModified();
        model.dsCountersByFlat.params.flat_id = aFlatID;
        model.dsCountersByFlat.params.account_id = anAccountID ? anAccountID : null;
        model.dsCountersByFlat.execute();
        try {
            var tmpCounter = model.dsCountersByFlat.find(model.dsCountersByFlat.schema.group_counter, aServiceCounterID);
            tmpCounter = tmpCounter.length ? tmpCounter : model.dsCountersByFlat.find(model.dsCountersByFlat.schema.services_id, aServiceCounterID);
            return tmpCounter[0].counter_id;
        } catch (e) {
            /* var cnt = addNewCounter();
             var fs = getFlatService(aFlatID, aServiceCounterID);
             addCounter2Service(cnt, fs, null);
             return cnt;*/
            Logger.warning('Ошибка!!!! modCounters.getCounterInFlat');
        }
        ;
    };



    self.setCounterValueByLCAndServiceCounter = function(aLC_ID, aServiceID, aDateID, aBegValue, aEndValue, anAccount) {
        // Для поддержки электроэнергии Т0 и Т1
        var counter;
        if (typeof(aServiceID) == 'object') {
            counter = getCounterInFlat(aLC_ID, aServiceID[0]);
            if (!counter)
                counter = getCounterInFlat(aLC_ID, aServiceID[1]);
        } else
            counter = getCounterInFlat(aLC_ID, aServiceID);
        if (counter)
            setCounterValueByCounterValueID(counter, aDateID, aBegValue, aEndValue);
    };

    self.setCounterValueByCounterValueID = function(aCounterID, aDateID, aBegValue, aEndValue, anAccount) {
        model.dsCountersValues.params.counterID = aCounterID;
        model.dsCountersValues.params.dateID = aDateID;
        model.dsCountersValues.execute();
        if (model.dsCountersValues.length === 0) {
            model.dsCountersValues.push({counter_id: aCounterID,
                    date_id: aDateID,
                    beg_val: aBegValue,
                    end_val: (aEndValue ? aEndValue : aBegValue)});
        } else {
            if (!!aBegValue)
                model.dsCountersValues.beg_val = +aBegValue;
            model.dsCountersValues.end_val = +aEndValue;
        }
        model.save();
        return true;
    };

    var checkModified = self.checkModified;
    var addNewCounter = self.addNewCounter;
    var addCounter2Service = self.addCounter2Service;
    var getCounterInFlat = self.getCounterInFlat;
    var getFlatService = self.getFlatService;
    var setCounterValueByLCAndServiceCounter = self.setCounterValueByLCAndServiceCounter;
    var setCounterValueByCounterValueID = self.setCounterValueByCounterValueID;
}