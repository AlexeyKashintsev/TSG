/**
 * 
 * @name ImportDataProcessor
 * @author Алексей
 * @module
 */ 
function ImportDataProcessor() {
    var self = this, model = this.model;
    var saldoMod = new SaldoAndSumsModule();
    var modCounters = new CountersModule();
    var errorRecords = [];
    var allRecords = [];
    var curStat = {
        readCount: 0,
        recReadSum: 0,
        recReadErrors: 0
    };
    
    var allStat = {
        allCount: 0,
        allSum: 0,
        allErrors: 0
    };
    
    function getLCByCode(aCode) {
        var code = (+aCode).toString();
        if (code.length === 5) {
            model.dsLCByCode.params.grp_code = code[0];
            model.dsLCByCode.params.flat_code = code.substring(1);
            model.dsLCByCode.requery();
            return model.dsLCByCode.empty ? false : model.dsLCByCode.cursor.lc_flat_id;
        } else {
            model.dsLCByCode.params.lc_num = code;
            model.dsLCByCode.requery();
            return model.dsLCByCode.empty ? false : model.dsLCByCode.cursor.lc_flat_id;
        }
    };
    
    var dateId, sessionId, accountId, bankPercent;
    self.setParams = function(aSessionId, aDateId, anAccountId, aBankPercent) {
        sessionId = aSessionId;
        dateId = aDateId;
        accountId = anAccountId;
        bankPercent = aBankPercent ? aBankPercent : 0;
        errorRecords = [];
    };
    
    self.check = function(aDataArray, aImpSpec) {
        var fileLen = aImpSpec.RECORD_COUNT;
        var recCount = (fileLen == aDataArray.length);
        return recCount;
    };
    
    /**
     * 
     * @param {type} aDataArray ->
     * {LC_ID
     * , LC_CODE
     * , OPL_SUM
     * , OPL_DATE
     * , OPL_COMMENT}
     * @returns {undefined}
     */
    self.processData = function(aDataArray, aImpSpec) {
        if (!dateId)
            dateId = paramSynchronizer.getDate();
        curStat.readCount = 0;
        curStat.recReadSum = 0;
        curStat.recReadErrors = 0;
        var hw_service, cw_service;
        
        aDataArray.forEach(function(aRow) {
            var lcid = !!aRow.LC_ID ? aRow.LC_ID : 
                    (!!aRow.LC_CODE ? getLCByCode(aRow.LC_CODE) : null);
           
            if (lcid) {
                curStat.readCount++;
                curStat.recReadSum += aRow.OPL_SUM;
                saldoMod.addOplata(lcid, sessionId, dateId
                                    , aRow.OPL_SUM - aRow.OPL_SUM * bankPercent/100
                                    , aRow.OPL_DATE, aRow.OPL_COMMENT + aImpSpec.REG_NUMBER ? aImpSpec.REG_NUMBER : ''
                                    , bankPercent, aRow.OPL_SUM);
                if (aRow.CUR_HW) {
                    if (!hw_service)
                        hw_service = model.qServiceWithSpecParam.find(model.qServiceWithSpecParam.schema.imp_name, "HW")[0].usl_services_id;
                    if (hw_service)
                        modCounters.setCounterValueByLCAndServiceCounter(lcid, hw_service, dateId, null, aRow.CUR_HW);
                }
                if (aRow.CUR_CW) {
                    if (!cw_service)
                        cw_service = model.qServiceWithSpecParam.find(model.qServiceWithSpecParam.schema.imp_name, "CW")[0].usl_services_id;
                    if (cw_service)
                        modCounters.setCounterValueByLCAndServiceCounter(lcid, cw_service, dateId, null, aRow.CUR_CW);
                }
            } else {
                errorRecords.push(aRow);
                curStat.recReadErrors++;
            }
        });
        allStat.allCount += curStat.readCount;
        allStat.allSum += curStat.recReadSum;
        allStat.allErrors += curStat.recReadErrors;
    };
    
    self.getErrors = function() {
        return errorRecords;
    };
    
    self.getLastStat = function() {
        return curStat;
    };
    
    self.getFullStat = function() {
        return allStat;
    };
}
