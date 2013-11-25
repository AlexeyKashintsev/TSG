/**
 * 
 * @author Alexey
 * @name SaldoAndSumsModule
 * @public
 */

var modLC = null;
//var modCN = null;

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
    if (!modCN) modCN = new CountersModule();
    modCN.setCounterValueByLCAndService(aLC_ID, aServiceID, aDateID, aBegValue, aEndValue);
}

function initSums(aGroupID, aLcID, aDateID){
    prcSumsCreate.params.groupid = aGroupID;
    prcSumsCreate.params.lcid = aLcID;
    prcSumsCreate.params.dateid = aDateID;
    prcSumsCreate.executeUpdate();
}