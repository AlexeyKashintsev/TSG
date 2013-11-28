/**
 *
 * @author Alexey
 * @name counter_values_to_date
 * @public 
 */ 
Select * 
From per_counter_values t1
 Where :dateID = t1.date_id
 and :CounterID = t1.counter_id