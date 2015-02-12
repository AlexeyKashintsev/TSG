/**
 *
 * @author Алексей
 * @name TarifsInGroup
 * @public
 * @writable usl_tarif
 */ 
Select t1.usl_tarif_id, t1.date_id, t1.group_id, t1.norm, t1.rate, t1.services_id
, t1.usr_context
, Case  When t.grp_parent = :parGroup Then t.grp_name else '' End AS child 
From usl_tarif t1
 Inner Join grp_groups t on t.grp_groups_id = t1.group_id
 Inner Join grp_services t2 on t2.group_id = t1.group_id and :parAccount = t2.account_id
     and t2.services_id = t1.services_id
 Where :parAccount = t1.account_id
 and :parDate = t1.date_id
 and (:parGroup = t.grp_groups_id or :parGroup = t.grp_parent)
order by t2.grp_services_id