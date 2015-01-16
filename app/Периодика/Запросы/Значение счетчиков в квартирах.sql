/**
 *
 * @procedure 
 * @author Alexey
 * @name counters_values_in_flats
 * @writable per_counter_values
 */ 
Select t2.counter_id, t.per_counter_values_id, t.counter_id
, t.date_id, t.end_val, t.beg_val
, t1.lc_id, t1.services_id 
From per_counter_values t
 Inner Join cnt_con2services t2 on t2.counter_id = t.counter_id
 Inner Join lc_flat_services t1 on t2.flat_service = t1.lc_flat_services_id
 Where :date_id = t.date_id
