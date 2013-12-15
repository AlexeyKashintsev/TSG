/**
 * 
 * @author Alexey
 * @name SaldoAndSumsModule
 * @public
 */

function SaldoAndSumsModule() {


    var self = this;


    var modLC = null;
//var modCN = null;

    self.saveChanges = function() {
        self.model.save();
    };

    /*
     * 
     * @param {type} aLC_ID
     * @param {type} aDate
     * @param {type} aValue
     * @returns {@exp;dsSaldo@pro;per_saldo_flat_id}
     */
    self.initBegSaldo = function(aLC_ID, aDate, aValue) {
        self.params.beginUpdate();
        self.parDateID = aDate;
        self.parFlatID = aLC_ID;
        self.params.endUpdate();
        if (self.dsSaldo.length == 0)
            self.dsSaldo.insert(self.dsSaldo.md.date_id, aDate,
                    self.dsSaldo.md.lc_id, aLC_ID,
                    self.dsSaldo.md.sal_begin, aValue);
        else
            self.dsSaldo.sal_begin = aValue;
        return self.dsSaldo.per_saldo_flat_id;
    };

    /*
     * Добавить значение счетчика
     * @param {type} aCounterID
     * @param {type} aDateID
     * @param {type} aBegValue
     * @param {type} aEndValue
     * @returns {undefined}
     */
    self.insertCounterValue = function(aLC_ID, aServiceID, aDateID, aBegValue, aEndValue) {
        if (!modCN)
            modCN = new CountersModule();
        modCN.setCounterValueByLCAndService(aLC_ID, aServiceID, aDateID, aBegValue, aEndValue);
    };

    self.initSums = function(aGroupID, aLcID, aDateID) {
        self.prcSumsCreate.params.groupid = aGroupID;
        self.prcSumsCreate.params.lcid = aLcID;
        self.prcSumsCreate.params.dateid = aDateID;
        self.prcSumsCreate.executeUpdate();
    };

    self.addOplata = function(aFlatID, aSessionID, aDateID, aSum, aDate, aComment) {
        self.dsOplById.insert(
            self.dsOplById.md.session_id, aSessionID,
            self.dsOplById.md.flat_id, aFlatID,
            self.dsOplById.md.payment_sum, aSum,
            self.dsOplById.md.date_id, aDateID,
            self.dsOplById.md.payment_date, aDate,
            self.dsOplById.md.payment_comment, aComment
    );
        self.model.save();
    };
}