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
            self.tarifsInGroup.insert(//self.tarifsInGroup.md.usl_tarif_id,self.servicesIsAbsent.grp_services_id,
                    self.tarifsInGroup.md.services_id, self.servicesIsAbsent.services_id,
                    self.tarifsInGroup.md.date_id, aDateID,
                    self.tarifsInGroup.md.group_id, aGroupID);
        }
        self.model.save();
    };
    /**
     * Применяет тарифы к начислениям в квартирах
     * @param {integer} aGroupID
     * @param {integer} aDateID
     * @returns {none}
     */
    self.applyTarifs = function(aGroupID, aDateID){
        self.ApplyTarifs.params.groupid = aGroupID;
        self.ApplyTarifs.params.dateid = aDateID;
        self.UpdatePer_sums.params.groupid = aGroupID;
        self.UpdatePer_sums.params.dateid = aDateID;
        self.UpdatePer_sums.execute();
        self.per_sums.md.beforeFirst();
        while (self.per_sums.md.next()) {
            self.per_sums.md.update(
                    self.per_sums.md.rate = self.UpdatePer_sums.rate
                    );
            self.per_sums.md.next();
        }
    };

}