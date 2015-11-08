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
    self.initBegSaldo = function(aLC_ID, aDate, anAccount, aValue) {
        Logger.info('Adding beg saldo' + aLC_ID + ' value: ' + aValue);
        
        model.dsSaldo.params.account_id = anAccount;
        model.dsSaldo.params.date_id = aDate;
        model.dsSaldo.params.flat_id = aLC_ID;
        model.dsSaldo.execute();
        
        if (model.dsSaldo.length === 0) {
            Logger.info('Saldo not present: ' + aLC_ID);
            model.dsSaldo.push({
                    date_id: aDate,
                    lc_id: aLC_ID,
                    sal_begin: aValue,
                    account_id: anAccount
                });
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
    self.addPenalties = function(aLC_ID, aDate, anAccount, aCurrentValue, aPreviousValue){
        model.dsSaldo.params.account_id = anAccount;
        model.dsSaldo.params.date_id = aDate;
        model.dsSaldo.params.flat_id = aLC_ID;
        model.dsSaldo.execute();
        
        if (!self.dsSaldo.length)
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
    self.insertCounterValue = function(aLC_ID, aServiceCounterID, aDateID, aBegValue, aEndValue) {
        if (!modCN)
            modCN = new CountersModule();
        modCN.setCounterValueByLCAndServiceCounter(aLC_ID, aServiceCounterID, aDateID, aBegValue, aEndValue);
    };

    self.initSums = function(aGroupID, aLcID, aDateID) {
        self.prcSumsCreate.params.groupid = aGroupID;
        self.prcSumsCreate.params.lcid = aLcID;
        self.prcSumsCreate.params.dateid = aDateID;
        self.prcSumsCreate.executeUpdate();
    };

    self.addOplata = function(aFlatID, aSessionID, aDateID, aSum, aDate, aComment, aPercent, aFullPay) {

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
    
    function checkCurrentSaldo(aFlatId, aDateId, anAccount) {
        if (aFlatId || aDateId) {
            model.dsSaldo.params.account_id = anAccount;
            model.dsSaldo.params.date_id = aDateId;
            model.dsSaldo.params.flat_id = aFlatId;
        }
        var cs = model.dsSaldo.cursor;
        var sum = cs.sal_benefit + cs.sal_full_calc + cs.sal_penalties_pay + cs.sal_recalc;
        return cs.sal_end == (cs.sal_begin + sum - cs.sal_payments).toFixed(2);
    }
    
    self.moveSaldo = function(aFlatId, aDateFromId, anAccount, aComment) {
        var dm = new DateModule();
        var nextDate = aDateFromId;
        var lastDate = dm.getLastDate();
        model.dsSaldo.params.account_id = anAccount;
        model.dsSaldo.params.date_id = nextDate;
        model.dsSaldo.params.flat_id = aFlatId;
        model.dsSaldo.requery();
        moveIt();
        
        function moveIt() {
            var es = model.dsSaldo.cursor.sal_end;
            nextDate = dm.nextDate(nextDate);
            if (nextDate) {
                model.dsSaldo.params.date_id = nextDate;
                model.dsSaldo.execute();
                var dif = model.dsSaldo.cursor.sal_begin - es;
                if (dif) {
                    var oldData = JSON.stringify(model.dsSaldo.cursor);
                    model.dsSaldo.cursor.sal_begin = (model.dsSaldo.cursor.sal_begin - dif).toFixed(2);
                    model.dsSaldo.cursor.sal_end = (model.dsSaldo.cursor.sal_end - dif).toFixed(2);
                    if (checkCurrentSaldo()){
                        model.qSaldoMove.push({
                            psf_id: model.dsSaldo.cursor.per_saldo_flat_id,
                            old_data: oldData,
                            comment: aComment
                        });
                        if (lastDate !== nextDate)
                            moveIt();
                        else {
                            model.save();
                            return 0;
                        }
                    } else {
                        model.revert();
                        model.qSaldoMove.push({
                            psf_id: model.dsSaldo.cursor.per_saldo_flat_id,
                            old_data: 'Ошибка при переносе даты. Квартира: ' + aFlatId + ', дата: ' + nextDate,
                            comment: aComment
                        });
                        model.save();
                        Logger.info('Сальдо не сходиться квартира: ' + aFlatId + ', дата: ' + nextDate);
                        return 'Ошибка при переносе даты. Квартира: ' + aFlatId + ', дата: ' + nextDate;
                    }
                }
            }
        } 
    };
}