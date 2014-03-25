/**
 *
 * @author Alexey
 * @name counter_service_by_counter_ID
 * @public 
 */ 
Select * 
From cnt_con2services t1
 Where :counterID = t1.counter_id