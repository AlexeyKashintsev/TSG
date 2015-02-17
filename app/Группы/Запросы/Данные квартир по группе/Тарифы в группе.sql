/**
 *
 * @author Alexey
 * @name Тарифы_в_группе
 * @writable usl_tarif
 */ 
Select t1.usl_tarif_id, t1.services_id, t1.date_id, t1.group_id, t1.rate, t1.norm
, t1.usr_context, t1.account_id
From usl_tarif t1
 Inner Join grp_services t on t.group_id = t1.group_id
 and t.services_id = t1.services_id
 and :account_id = t.account_id
 Where :date_id = t1.date_id
 and :group_id = t.group_id
 and :account_id = t1.account_id