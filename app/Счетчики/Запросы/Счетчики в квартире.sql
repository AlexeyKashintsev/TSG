/**
 *
 * @author Alexey
 * @name Счетчики_в_квартире
 */ 
Select * 
From cnt_counters t1
 Inner Join cnt_con2services t on t1.cnt_counters_id = t.counter_id
 Inner Join lc_flat_services t2 on t.flat_service = t2.lc_flat_services_id
 Left Join per_counter_values t3 on t1.cnt_counters_id = t3.counter_id
 Where :lcId = t2.lc_id