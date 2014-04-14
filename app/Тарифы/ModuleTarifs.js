/**
 * 
 * @author Андрей
 * @name TarifsModule
 * @public
 */

function TarifsModule() {


    var self = this;


    /*
     * Сопоставить тарифы с услугами в группе
     * @param {type} parDateID
     * @param {type} parGroupID
     * @returns {@exp;services_by_group}
     * TODO Доделать добавление,запутался куда добавлять;
     */
    self.addMissingTarifs = function(aDateID, aGroupID) {
        self.servicesIsAbsent.params.parDateID = aDateID;
        self.servicesIsAbsent.params.parGroupID = aGroupID;
        self.servicesIsAbsent.execute();
        self.servicesIsAbsent.beforeFirst();
        while (self.servicesIsAbsent.next()) {
            self.tarifsInGroup.insert(//self.tarifsInGroup.schema.usl_tarif_id,self.servicesIsAbsent.grp_services_id,
                    self.tarifsInGroup.schema.services_id, self.servicesIsAbsent.services_id,
                    self.tarifsInGroup.schema.date_id, aDateID,
                    self.tarifsInGroup.schema.group_id, aGroupID);
        }
        self.model.save();
    };
    /**
     * Применяет тарифы к начислениям в квартирах
     * @param {integer} aGroupID
     * @param {integer} aDateID
     * @returns {none}
     */
    self.applyTarifs = function(aDateID, aGroupID){
       // self.ApplyTarifs.params.groupid = aGroupID;
//        self.ApplyTarifs.params.dateid = aDateID;
        self.dsUpdatePer_sums.params.groupid = aGroupID;
        self.dsUpdatePer_sums.params.dateid = aDateID;
        self.dsUpdatePer_sums.executeUpdate();
      /*  self.dsUpdatePer_sums.beforeFirst();
        while (self.dsUpdatePer_sums.next()) {
            self.dsUpdatePer_sums.rate = self.dsUpdatePer_sums.tRate;
        }
        self.model.save();*/
    };

}