/**
 * 
 * @author Андрей
 * @name TarifsModule
 * @public
 */

function TarifsModule() {


    var self = this, model = self.model;


    /*
     * Сопоставить тарифы с услугами в группе
     * @param {type} parDateID
     * @param {type} parGroupID
     * @returns {@exp;services_by_group}
     * TODO Доделать добавление,запутался куда добавлять;
     */
    self.addMissingTarifs = function(aDateID, aGroupID, aAccountID) {
        model.prClearTarifs.params.parDateID = aDateID;
        model.prClearTarifs.params.parGroupID = aGroupID;
        model.prClearTarifs.params.parAccountID = aAccountID;
        model.prClearTarifs.executeUpdate();
        
        model.servicesIsAbsent.params.parDateID = aDateID;
        model.servicesIsAbsent.params.parGroupID = aGroupID;
        model.servicesIsAbsent.params.parAccountID = aAccountID;
        model.servicesIsAbsent.requery();
        model.servicesIsAbsent.forEach(function(cursor) {
            model.tarifsInGroup.push({
                    services_id: cursor.services_id,
                    date_id: aDateID,
                    group_id: aGroupID,
                    account_id: aAccountID
                });
        });
        model.save();
    };
    /**
     * Применяет тарифы к начислениям в квартирах
     * @param {integer} aGroupID
     * @param {integer} aDateID
     * @returns {none}
     */
    self.applyTarifs = function(aDateID, aGroupID, anAccountID) {
       // self.ApplyTarifs.params.groupid = aGroupID;
//        self.ApplyTarifs.params.dateid = aDateID;
        model.dsUpdatePer_sums.params.groupid = aGroupID;
        model.dsUpdatePer_sums.params.dateid = aDateID;
        model.dsUpdatePer_sums.params.accountid = anAccountID;
        model.dsUpdatePer_sums.executeUpdate();
      /*  self.dsUpdatePer_sums.beforeFirst();
        while (self.dsUpdatePer_sums.next()) {
            self.dsUpdatePer_sums.rate = self.dsUpdatePer_sums.tRate;
        }
        self.model.save();*/
    };
    
    self.recalc = function(aDateID, aGroupID, anAccountID, aServiceId, aRecalcRate, aBaseRate) {
        var calc = new Calculations();
        
        model.applyTarif.params.groupid = aGroupID;
        model.applyTarif.params.dateid = aDateID;
        model.applyTarif.params.accountid = anAccountID;
        model.applyTarif.params.serviceId = aServiceId;
        model.applyTarif.params.rate = aRecalcRate;
        model.applyTarif.executeUpdate();
        calc.calculateRecalc(aGroupID, null, aDateID, aServiceId, function() {
            if (aBaseRate != aRecalcRate) {
                model.applyTarif.params.rate = aBaseRate;
                model.applyTarif.executeUpdate();
            }
        });
    };

}