/**
 *
 * @procedure 
 * @author Alexey
 * @name dsCounterValuesForGroup
 * @writable per_counter_values
 */ 
Select t2.counter_id, t.per_counter_values_id, t.counter_id
, t.date_id, t.end_val, t.beg_val
, t.end_val-t.beg_val AS cons_val, t1.lc_id, t1.services_id
, t4.counter_name 
From per_counter_values t
 Inner Join cnt_con2flats t2 on t2.counter_id = t.counter_id
 Inner Join lc_flat_services t1 on t2.flat_service = t1.lc_flat_services_id
 Inner Join grp_lc_group t3 on t1.lc_id = t3.lc_id
 Inner Join grp_service_counters t4 on t2.group_counter = t4.grp_service_counters_id
 Inner Join grp_services t5 on t4.grp_service_id = t5.grp_services_id
 Where :date_id = t.date_id
 and (:group_id = t3.group_id)
 and t5.askforvalue = true
 and :account_id = t1.account_id
 and :account_id = t5.account_id
 and :service_id = t1.services_id