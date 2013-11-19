/**
 * 
 * @author Alexey
 * @name moduleSaldoAndSums
 * @public
 */

var filterCounterValues = null;
var modLC = null;

function saveChanges(){
    model.save();
}

/*
 * 
 * @param {type} aLC_ID
 * @param {type} aDate
 * @param {type} aValue
 * @returns {@exp;dsSaldo@pro;per_saldo_flat_id}
 */
function initBegSaldo(aLC_ID, aDate, aValue){
    params.beginUpdate();
        parDateID = aDate;
        parFlatID = aLC_ID;
    params.endUpdate();
    if (dsSaldo.length == 0)
        dsSaldo.insert( dsSaldo.md.date_id, aDate,
                        dsSaldo.md.lc_id, aLC_ID,
                        dsSaldo.md.sal_begin, aValue);
    else
        dsSaldo.sal_begin = aValue;
    return dsSaldo.per_saldo_flat_id;
}

/*
 * Добавить значение счетчика
 * @param {type} aCounterID
 * @param {type} aDateID
 * @param {type} aBegValue
 * @param {type} aEndValue
 * @returns {undefined}
 */
function insertCounterValue(aLC_ID, aServiceID, aDateID, aBegValue, aEndValue){
    params.beginUpdate();
        parDateID = aDateID;
        parFlatID = aLC_ID;
    params.endUpdate();
    
    if (filterCounterValues == null)
        filterCounterValues = dsCountersValues.createFilter(dsCountersValues.md.services_id,
                                                            dsCountersValues.md.date_id);
    
    filterCounterValues.apply(aServiceID, aDateID);
    
    if (dsCountersValues.length == 0){
        if (!modLC) modLC = new moduleLC();
        var counterID = modLC.getCouterInFlat(aLC_ID, aServiceID);
        dsCountersValues.insert(dsCountersValues.md.counter_id, counterID,
                                dsCountersValues.md.date_id, aDateID,
                                dsCountersValues.md.beg_val, aBegValue,
                                dsCountersValues.md.end_val, aEndValue);
    } else {
        dsCountersValues.beg_val = aBegValue;
        dsCountersValues.end_val = aEndValue;
    }
    model.save();
}

function initSums(aGroupID, aLcID, aDateID){
    prcSumsCreate.params.groupid = aGroupID;
    prcSumsCreate.params.lcid = aLcID;
    prcSumsCreate.params.dateid = aDateID;
    prcSumsCreate.executeUpdate();
}