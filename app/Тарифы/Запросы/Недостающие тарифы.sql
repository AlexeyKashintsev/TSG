/**
 * @public
 * @author Андрей
 * @name ServicesIsAbsent
 * @manual
 */
Select grp_services_id,services_id
From grp_services m
Where m.services_id not in (select services_id
From usl_tarif d
 Where  :parDateID = d.date_id
    and :parGroupID = d.group_id
    and :parAccountID = d.account_id
) and :parGroupID = m.group_id
and :parAccountID = m.account_id