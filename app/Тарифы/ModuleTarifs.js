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
        model.servicesIsAbsent.params.parDateID = aDateID;
        model.servicesIsAbsent.params.parGroupID = aGroupID;
        model.servicesIsAbsent.params.parAccountID = aAccountID;
        model.servicesIsAbsent.execute();
        model.servicesIsAbsent.forEach(function(cursor) {
            model.tarifsInGroup.insert(//self.tarifsInGroup.schema.usl_tarif_id,self.servicesIsAbsent.grp_services_id,
                    model.tarifsInGroup.schema.services_id, model.servicesIsAbsent.services_id,
                    model.tarifsInGroup.schema.date_id, aDateID,
                    model.tarifsInGroup.schema.group_id, aGroupID,
                    model.tarifsInGroup.schema.account_id, aAccountID);
        });
        model.save();
    };
    /**
     * Применяет тарифы к начислениям в квартирах
     * @param {integer} aGroupID
     * @param {integer} aDateID
     * @returns {none}
     */
    self.applyTarifs = function(aDateID, aGroupID,aAccountID){
       // self.ApplyTarifs.params.groupid = aGroupID;
//        self.ApplyTarifs.params.dateid = aDateID;
        model.dsUpdatePer_sums.params.groupid = aGroupID;
        model.dsUpdatePer_sums.params.dateid = aDateID;
        model.dsUpdatePer_sums.params.accountid = aAccountID;
        model.dsUpdatePer_sums.executeUpdate();
      /*  self.dsUpdatePer_sums.beforeFirst();
        while (self.dsUpdatePer_sums.next()) {
            self.dsUpdatePer_sums.rate = self.dsUpdatePer_sums.tRate;
        }
        self.model.save();*/
    };

}