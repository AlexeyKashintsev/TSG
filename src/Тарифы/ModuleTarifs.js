/**
 * 
 * @author Андрей
 * @name ModuleTarifs
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
    insertServicesIsAbsent.params.Date = aFlatID;
    insertServicesIsAbsent.params.Group = aGroupID;
    insertServicesIsAbsent.execute();
    insertServicesIsAbsent.beforeFirst();
         while (insertServicesIsAbsent.next()){
            dstarifsInGroup.insert(dstarifsInGroup.md.services_id,dsservices_by_group.grp_services_id, 
                             dstarifsInGroup.md.date_id, parDate,
                             dstarifsInGroup.md.group_id,parGroup,
                             dstarifsInGroup.md.rate,dstarifsInGroup.rate.last,
                             dstarifsInGroup.md.norm,dsdstarifsInGroup.norm.last);}
            }
            
       
    model.save();    


