/**
 * 
 * @author Alexey
 * @name SaldoAndSumsModule
 * @public
 */

function SaldoAndSumsModule() {


    var self = this, model = self.model;


    var modLC = null;
    var modCN = null;
    
    self.setServModules = function(aModSN, aModCN){
        modSN = aModSN;
        modCN = aModCN;
    };

    self.saveChanges = function() {
        model.save();
    };

    /*
     * 
     * @param {type} aLC_ID
     * @param {type} aDate
     * @param {type} aValue
     * @returns {@exp;dsSaldo@pro;per_saldo_flat_id}
     */
    self.initBegSaldo = function(aLC_ID, aDate, aValue) {
        Logger.info('Adding beg saldo' + aLC_ID + ' value: ' + aValue);
        model.params.beginUpdate();
        model.params.parDateID = aDate;
        model.params.parFlatID = aLC_ID;
        model.params.endUpdate();
        if (model.dsSaldo.length === 0) {
            Logger.info('Saldo not present: ' + aLC_ID);
            model.dsSaldo.insert(model.dsSaldo.schema.date_id, aDate,
                    model.dsSaldo.schema.lc_id, aLC_ID,
                    model.dsSaldo.schema.sal_begin, aValue);
        } else {
            model.dsSaldo.cursor.sal_begin = aValue;
            Logger.info('Saldo present: ' + aLC_ID + ' value: ' + model.dsSaldo.cursor.sal_begin);
        }
        return model.dsSaldo.per_saldo_flat_id;
    };
    
    /*
     * Добавить пени в квартиру
     * @param {type} aLC_ID
     * @param {type} aDate
     * @param {type} aCurrentValue
     * @param {type} aPreviousValue
     * @returns {undefined}
     */
    self.addPenalties = function(aLC_ID, aDate, aCurrentValue, aPreviousValue){
        self.params.beginUpdate();
        self.parDateID = aDate;
        self.parFlatID = aLC_ID;
        self.params.endUpdate();
        if (self.dsSaldo.length == 0)
            self.dsSaldo.insert(self.dsSaldo.schema.date_id, aDate,
                    self.dsSaldo.schema.lc_id, aLC_ID,
                    self.dsSaldo.schema.sal_penalties_cur, aCurrentValue,
                    self.dsSaldo.schema.sal_penalties_old, aPreviousValue);
        else {
            self.dsSaldo.sal_penalties_cur = aCurrentValue;
            self.dsSaldo.schema.sal_penalties_old = aPreviousValue;
        }
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

    self.addOplata = function(aFlatID, aSessionID, aDateID, aSum, aDate, aComment, aPercent, aFullPay) {
        if (aPercent === 0){
            if (aFullPay === null)
                aFullPay = aSum;
            else
                aSum = aFullPay;
        }
        else
            aSum = aFullPay/(1 + aPercent/100);
        model.dsOplById.push({
            session_id:      aSessionID,
            flat_id:         aFlatID,
            payment_sum:     aSum,
            date_id:         aDateID,
            payment_date:    aDate,
            payment_comment: aComment,
            bank_percent:    aPercent,
            full_payment:    aFullPay
        });
        model.save();
    };
}