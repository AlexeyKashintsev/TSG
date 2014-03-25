/**
 * 
 * @author Alexey
 * @name updateNullCounterValues
 * @manual
 */
update per_counter_values
set end_val = beg_val
 Where :dateID = date_id and (end_val < beg_val or end_val is null)