/**
 *
 * @author Alexey
 * @name lc_beg_counter_values_4calc
 * @manual 
 */ 
Select t.lc_id, t.lc_flat_services_id, t2.beg_val AS fm_value
, 'BEG_' || t4.cnt_type AS fm_name, t.services_id 
From lc_flat_services t
 Inner Join cnt_con2services t1 on t.lc_flat_services_id = t1.flat_service
 Inner Join per_counter_values t2 on t1.counter_id = t2.counter_id
 Inner Join cnt_counters t4 on t1.counter_id = t4.cnt_counters_id
 Where :dateid = t2.date_id
 and :lc_id = t.lc_id