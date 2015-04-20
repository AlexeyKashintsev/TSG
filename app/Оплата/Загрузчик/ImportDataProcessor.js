/**
 * 
 * @author Алексей
 * @module
 */ 
function ImportDataProcessor() {
    var self = this, model = this.model;
    var saldoMod = new SaldoAndSumsModule();
    
    function getLCByCode(aCode) {
        model.dsLCByCode.params.grp_code = parseInt(aCode[0]);
        model.dsLCByCode.params.flat_code = parseInt(aCode.substring(1));
        model.dsLCByCode.requery();
        return model.dsLCByCode.cursor.lc_flat_id;
    };
    
    var dateId, sessionId;
    self.setParams = function(aSessionId, aDateId) {
        sessionId = aSessionId;
        dateId = aDateId;
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
    self.processData = function(aDataArray, aPercent) {
        if (!aPercent)
            aPercent = 0;
        if (!dateId)
            dateId = paramSynchronizer.getData();
        
        aDataArray.forEach(function(aRow) {
            var lcid = aRow.LC_ID ? aRow.LC_ID : getLCByCode(aRow.LC_CODE);
            if (lcid) {
                saldoMod.addOplata(lcid, sessionId, dateId
                                    , aRow.OPL_SUM - aRow.OPL_SUM * aPercent
                                    , aRow.OPL_DATE, aRow.OPL_COMMENT
                                    , aPercent, aRow.OPL_SUM);
            } else {
                //TODO Обработать сию печальную ситуацию
            }
        });
    };
}
