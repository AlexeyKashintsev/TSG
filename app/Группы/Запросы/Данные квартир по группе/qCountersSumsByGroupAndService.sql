/**
 * 
 * @author Алексей
 * @name qCountersSumsByGroupAndService
 * @readonly
 */
Select sum(t.beg_val) as beg_val, sum(t.end_val) as end_val, sum(t.end_val-t.beg_val) as consumed
From per_counter_values t
 Inner Join cnt_con2flats t2 on t2.counter_id = t.counter_id
 Inner Join lc_flat_services t1 on t2.flat_service = t1.lc_flat_services_id
 Inner Join grp_lc_group t3 on t1.lc_id = t3.lc_id
 Where :date_id = t.date_id
 and :group_id = t3.group_id
 and :service_id = t1.services_id