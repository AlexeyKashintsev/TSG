/**
 *
 * @author Алексей
 * @name dsAllGroupCountersByGroup
 */ 
Select t.grp_service_counters_id, t2.usl_name, t.counter_name
, t2.usl_name || '/' || t.counter_name as f_name
From grp_services t1
 Inner Join grp_service_counters t on t.grp_service_id = t1.grp_services_id
 Inner Join usl_services t2 on t2.usl_services_id = t1.services_id
where t.con_grp_counter is null and :group_id = t1.group_id
 and :account_id = t1.account_id