/* 
 * @public 
 * @author Андрей
 * @name dsServicesIsAbsent
 */ 
Select grp_services_id as services_id
From grp_services m
Where  not exists (Select services_id
From usl_tarif d
 Where d.services_id = m.grp_services_id
 and :parDateID = d.date_id
 and :parGroupID = d.group_id
 and :parGroupID = m.group_id
)