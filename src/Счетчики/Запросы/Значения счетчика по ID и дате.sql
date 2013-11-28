/**
 * @public
 * @author Alexey
 * @name counter_values_by_ID_and_date
 */ 
Select * 
From per_counter_values t1
 Where :counterID = t1.counter_id
 and :dateID = t1.date_id