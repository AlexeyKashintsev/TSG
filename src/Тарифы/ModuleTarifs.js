/**
 * 
 * @author Андрей
 * @name TarifsModule
 * @public
 */

/*
 * Добавить новый тариф
 * @param {type} parDateID
 * @param {type} parGroupID
 * @returns {@exp;services_by_group}
 * TODO Доделать добавление,запутался куда добавлять;
 */
function addNewTarifs(aDateID,aGroupID){  
    servicesIsAbsent.params.parDateID = aDateID;
    servicesIsAbsent.params.parGroupID = aGroupID;
    servicesIsAbsent.execute();
    servicesIsAbsent.beforeFirst();
         while (servicesIsAbsent.next()){       
          tarifsInGroup.insert(//tarifsInGroup.md.usl_tarif_id,servicesIsAbsent.grp_services_id,
                                 tarifsInGroup.md.services_id,servicesIsAbsent.services_id,
                                 tarifsInGroup.md.date_id, aDateID,
                                 tarifsInGroup.md.group_id,aGroupID);
                                        }
model.save();
}
            



