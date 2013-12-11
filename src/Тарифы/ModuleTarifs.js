/**
 * 
 * @author Андрей
 * @name TarifsModule
 * @public
 */

function TarifsModule() {


var self = this;


/*
 * Добавить новый тариф
 * @param {type} parDateID
 * @param {type} parGroupID
 * @returns {@exp;services_by_group}
 * TODO Доделать добавление,запутался куда добавлять;
 */
function addNewTarifs(aDateID,aGroupID){  
    self.servicesIsAbsent.params.parDateID = aDateID;
    self.servicesIsAbsent.params.parGroupID = aGroupID;
    self.servicesIsAbsent.execute();
    self.servicesIsAbsent.beforeFirst();
         while (self.servicesIsAbsent.next()){       
          self.tarifsInGroup.insert(//self.tarifsInGroup.md.usl_tarif_id,self.servicesIsAbsent.grp_services_id,
                                 self.tarifsInGroup.md.services_id,self.servicesIsAbsent.services_id,
                                 self.tarifsInGroup.md.date_id, aDateID,
                                 self.tarifsInGroup.md.group_id,aGroupID);
                                        }
self.model.save();
}
            




}