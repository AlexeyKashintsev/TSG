/**
 *
 * @author Alexey
 * @name counters_values_by_flat
 * @writable per_counter_values
 */ 
Select *, t.end_val-t.beg_val AS cons_val
From counters_by_flat q1
 Inner Join per_counter_values t on q1.lc_counter_id = t.counter_id
 Where :date_id = t.date_id