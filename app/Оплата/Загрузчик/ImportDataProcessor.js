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
    
    function getLCByCode(aCode, sNum) {
        var code = (+aCode).toString();
        if (code.length === 5) {
            model.dsLCByCode.params.grp_code = code[0];
            model.dsLCByCode.params.flat_code = code.substring(1);
//            model.dsLCByCode.params.lc_num = code;
            model.dsLCByCode.requery();
            return model.dsLCByCode.empty ? false : model.dsLCByCode.cursor.lc_flat_id;
        } else 
            return null;/*{
            model.dsLCByCode.params.lc_num = code;
            model.dsLCByCode.requery();
            return model.dsLCByCode.empty ? false : model.dsLCByCode.cursor.lc_flat_id;
        }*/
    };
    
    function getLCByNum(aNum, aGroup) {
        model.dsLCByCode.params.flat_code = +aNum;
        if (aGroup)
            model.dsLCByCode.params.grp_code = (+aGroup).toString();
        model.dsLCByCode.requery();
        return model.dsLCByCode.empty ? false : model.dsLCByCode.cursor.lc_flat_id;
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
        var hw_service, cw_service, t0_service, t1_service, t2_service;
        
        aDataArray.forEach(function(aRow) {
            var lcid;
            if (aRow.LC_CODE_NUM) {
                lcid = getLCByCode(aRow.LC_CODE_NUM, true);
                if (!lcid);
                    lcid = getLCByNum(aRow.LC_CODE_NUM);
            } else if (aRow.LC_GROUP_ID) {
                lcid = getLCByNum(aRow.LC_NUM, aRow.LC_GROUP_ID);
            } else
                lcid = !!aRow.LC_ID ? aRow.LC_ID : 
                    (!!aRow.LC_CODE ? getLCByCode(aRow.LC_CODE) : 
                    (!!aRow.LC_NUM ? getLCByNum(aRow.LC_NUM) : null));
           
            if (lcid) {
                curStat.readCount++;
                curStat.recReadSum += aRow.OPL_SUM;
                if (aRow.OPL_SUM)
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
                if (aRow.CUR_T1) {
                    if (!t1_service) {
                        t1_service = model.qServiceWithSpecParam.find(model.qServiceWithSpecParam.schema.imp_name, "T1")[0].usl_services_id;
                        t0_service = model.qServiceWithSpecParam.find(model.qServiceWithSpecParam.schema.imp_name, "T0")[0].usl_services_id;
                    }
                    if (t1_service)
                        modCounters.setCounterValueByLCAndServiceCounter(lcid, [t1_service, t0_service], dateId, null, aRow.CUR_T1);
                }
                if (aRow.CUR_T2) {
                    if (!t2_service)
                        t2_service = model.qServiceWithSpecParam.find(model.qServiceWithSpecParam.schema.imp_name, "T2")[0].usl_services_id;
                    if (t2_service)
                        modCounters.setCounterValueByLCAndServiceCounter(lcid, t2_service, dateId, null, aRow.CUR_T2);
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
