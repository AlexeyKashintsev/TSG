/**
 *
 * @author Alexey
 * @name updateCountersValues
 * @manual
 */ 
select * from per_counter_values
 Where :dateID = t1.date_id and (end_val < beg_val or end_val is null)