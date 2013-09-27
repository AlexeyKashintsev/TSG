/**
 *
 * @public 
 * @author Alexey
 * @name counters_values_per_flat_on_date
 * @writable per_counter_values
 */ 
Select *,
case when t1.end_val is not null then t1.end_val - t1.beg_val else null end as consumed_values
From per_counter_values t1
 Inner Join counters_by_flat q on t1.counter_id = q.lc_counter_id
 Where :date_id = t1.date_id