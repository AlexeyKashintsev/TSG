/**
 *
 * @author Alexey
 * @name counters_by_service
 * @public
 * @writable cnt_counters
 */ 
Select t.cnt_counters_id, t.cnt_number, t. cnt_active, t.cnt_type
From cnt_counters t
 Inner Join cnt_con2services t1 on t.cnt_counters_id = t1.counter_id
 Where (:flat_service = t1.flat_service or :flat_service is null)
 and (:group_service = t1.group_service or :group_service is null)