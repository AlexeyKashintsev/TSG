/**
 *
 * @author Alexey
 * @name counters_values_by_flat
 * @writable per_counter_values
 */ 
Select t.per_counter_values_id, t.counter_id, t.date_id, t.end_val, t.beg_val, t.end_val-t.beg_val AS cons_val,
    t1.lc_id, t1.services_id
From counters_by_flat q1
 Inner Join per_counter_values t on q1.counter_id = t.counter_id
 and q1.counter_id = t.counter_id
 Inner Join lc_flat_services t1 on q1.flat_service = t1.lc_flat_services_id
 Where :date_id = t.date_id