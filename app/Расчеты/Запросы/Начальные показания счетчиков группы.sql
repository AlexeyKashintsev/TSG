/**
 *
 * @author Alexey
 * @name group_counter_beg_values_4calc
 * @manual 
 */ 
Select t3.beg_val AS fm_value, 'BEG_' || t1.cnt_type AS fm_name, t2.group_id
, t2.services_id, t2.grp_services_id 
From grp_services t2
 Inner Join grp_service_counters t4 on t2.grp_services_id = t4.grp_service_id
 inner join cnt_con2flats t on t4.grp_service_counters_id = t.group_counter
 Inner Join cnt_counters t1 on t1.cnt_counters_id = t.counter_id
 Inner Join per_counter_values t3 on t.counter_id = t3.counter_id
 Where :dateid = t3.date_id
 and :groupid = t2.group_id