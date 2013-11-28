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
 */
function addNewTarifs()
{   for (i=0;i<services_by_group.length;i++)
        {for (j=0;j<tarifsInGroup.length;j++)
            {  s=0;
             if(services_by_group.grp_services_id === tarifsInGroup.services_id)
                s+=1;
            }
         if(s===0)
            {dstarifsInGroup.insert(dstarifsInGroup.md.services_id,dsservices_by_group.grp_services_id, 
                                    dstarifsInGroup.md.date_id, parDate,
                                    dstarifsInGroup.md.group_id,parGroup,
                                    dstarifsInGroup.md.rate,dstarifsInGroup.rate.last,
                                    dstarifsInGroup.md.norm,dsdstarifsInGroup.norm.last);
            }
            
        }
    model.save();    
}

