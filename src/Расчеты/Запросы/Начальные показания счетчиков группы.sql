/**
 *
 * @author Alexey
 * @name group_counter_beg_values_4calc
 * @manual 
 */ 
Select t4.lc_id, t4.lc_flat_services_id, t3.beg_val AS fm_value
, 'GRP_BEG_' || t1.cnt_type AS fm_name 
From Calc_object q
 Inner Join grp_services t2 on t2.group_id = q.group_id
 Inner Join cnt_con2services t on t2.grp_services_id = t.group_service
 Inner Join cnt_counters t1 on t1.cnt_counters_id = t.counter_id
 Inner Join per_counter_values t3 on t.counter_id = t3.counter_id
 Inner Join lc_flat_services t4 on t4.services_id = t2.services_id
 and q.lc_id = t4.lc_id
 Where :dateid = t3.date_id