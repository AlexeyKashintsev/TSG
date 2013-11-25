/**
 *
 * @public 
 * @author Alexey
 * @name counters_by_flat
 * @writable cnt_con2services
 */ 
Select t.cnt_con2services_id, t.counter_id, t.group_service
, t.flat_service, t2.cnt_counters_id, t2.cnt_number, t2.cnt_type
, t2.cnt_active, t1.services_id

From lc_flat_services t1
 Inner Join cnt_con2services t on t1.lc_flat_services_id = t.flat_service
 Inner Join cnt_counters t2 on t.counter_id = t2.cnt_counters_id
 Where :flat_id = t1.lc_id or :all_flats = true