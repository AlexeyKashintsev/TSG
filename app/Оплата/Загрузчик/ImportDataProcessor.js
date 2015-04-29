/**
 * 
 * @author Алексей
 * @module
 */ 
function ImportDataProcessor() {
    var self = this, model = this.model;
    var saldoMod = new SaldoAndSumsModule();
    var errorRecords = [];
    var allRecords = [];
    var curStat = {
        recReadCount: 0,
        recReadSum: 0,
        recReadErrors: 0
    };
    
    var allCount, allSum, allErrors;
    
    function getLCByCode(aCode) {
        model.dsLCByCode.params.grp_code = aCode[0];
        model.dsLCByCode.params.flat_code = aCode.substring(1);
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
        var recCount = (fileLen === aDataArray.length);
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
            dateId = paramSynchronizer.getData();
        curStat.recReadCount = 0;
        curStat.recReadSum = 0;
        curStat.recReadErrors = 0;
        
        aDataArray.forEach(function(aRow) {
            var lcid = !!aRow.LC_ID ? aRow.LC_ID : 
                    (!!aRow.LC_CODE ? getLCByCode(aRow.LC_CODE) : null);
           
            if (lcid) {
                curStat.recReadCount++;
                curStat.recReadSum += aRow.OPL_SUM;
                saldoMod.addOplata(lcid, sessionId, dateId
                                    , aRow.OPL_SUM - aRow.OPL_SUM * bankPercent/100
                                    , aRow.OPL_DATE, aRow.OPL_COMMENT + aImpSpec.REG_NUMBER ? aImpSpec.REG_NUMBER : ''
                                    , bankPercent, aRow.OPL_SUM);
            } else {
                errorRecords.push(aRow);
                curStat.recReadErrors++;
            }
        });
        allCount += curStat.recReadCount;
        allSum += curStat.recReadSum;
        allErrors += curStat.recReadErrors;
    };
    
    self.getErrors = function() {
        return errorRecords;
    };
    
    self.getLastStat = function() {
        return ;
    }
}
