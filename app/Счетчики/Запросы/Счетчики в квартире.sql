/**
 *
 * @public 
 * @author Alexey
 * @name counters_by_flat
 * @writable cnt_con2flats, cnt_counters
 */ 
Select t.cnt_con2flats_id, t1.lc_id, t.counter_id
, t.group_counter, t.flat_service, t2.cnt_counters_id
, t2.cnt_number, t2.cnt_type, t2.cnt_active
, t1.services_id, t.main_service 
From lc_flat_services t1
 Inner Join cnt_con2flats t on t1.lc_flat_services_id = t.flat_service
 Inner Join cnt_counters t2 on t.counter_id = t2.cnt_counters_id
 Where (:flat_id = t1.lc_id or :all_flats = true)
 and (:account_id = t1.account_id or :account_id is null)