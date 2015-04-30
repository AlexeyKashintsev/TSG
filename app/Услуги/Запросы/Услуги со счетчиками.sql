/**
 *
 * @author Алексей
 * @name qServicesWithCounters
 * @public
 * @writable usl_services
 */ 
Select t2.grp_service_counters_id, t.grp_name || ' ' || t1.usl_name || ' ' || t2.counter_name as f_name
From usl_services t1
 Inner Join grp_services t3 on t3.services_id = t1.usl_services_id
 Inner Join grp_service_counters t2 on t2.grp_service_id = t3.grp_services_id
 Inner Join grp_groups t on t3.group_id = t.grp_groups_id