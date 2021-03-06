/**
 * 
 * @author Алексей
 * @module
 */ 
function ImportDataProcessor() {
    var self = this, model = this.model;
    var saldoMod = new SaldoAndSumsModule();
    var errorRecords = [];
    
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
    self.processData = function(aDataArray) {
        if (!dateId)
            dateId = paramSynchronizer.getData();
        
        aDataArray.forEach(function(aRow) {
            var lcid = aRow.LC_ID ? aRow.LC_ID : getLCByCode(aRow.LC_CODE);
            if (lcid) {
                saldoMod.addOplata(lcid, sessionId, dateId
                                    , aRow.OPL_SUM - aRow.OPL_SUM * bankPercent/100
                                    , aRow.OPL_DATE, aRow.OPL_COMMENT
                                    , bankPercent, aRow.OPL_SUM);
            } else {
                errorRecords.push(aRow);
            }
        });
    };
    
    self.getErrors = function() {
        return errorRecords;
    };
}
