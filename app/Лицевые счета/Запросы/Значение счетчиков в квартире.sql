/**
 *
 * @author Alexey
 * @name counters_values_by_flat
 * @writable per_counter_values
 * @public
 * @rolesAllowed admin operator buh
 */ 
Select t.per_counter_values_id, t.counter_id, t.date_id
, t.end_val, t.beg_val, t.end_val-t.beg_val AS cons_val
, q1.lc_id, q1.services_id, t2.askforvalue
, t2.askinbills, t4.counter_name 
From counters_by_flat q1
 Inner Join per_counter_values t on q1.counter_id = t.counter_id
 Inner Join grp_services t2 on q1.services_id = t2.services_id
 and :parAccount = t2.account_id
 Left Join grp_service_counters t4 on q1.group_counter = t4.grp_service_counters_id
 Where :date_id = t.date_id
 and t2.askforvalue = true
 Order by t2.grp_services_id