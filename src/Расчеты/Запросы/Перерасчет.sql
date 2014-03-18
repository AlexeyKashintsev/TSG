/**
 *
 * @author Alexey
 * @name Перерасчет
 * @writable per_sums
 */ 
Select * 
From grp_lc_group t1
 Inner Join lc_flat_services t2 on t1.lc_id = t2.lc_id
 Inner Join per_sums t on t2.lc_flat_services_id = t.flat_service_id
 Inner Join cnt_con2services t4 on t2.lc_flat_services_id = t4.flat_service
 Inner Join per_counter_values t3 on t4.counter_id = t3.counter_id
 Where (:groupid = t1.group_id or :groupid is null)
 and (:flatid = t1.lc_id or :flatid is null)
 and :serviceid = t2.services_id
 and :dateid = t.date_id
 and :countersDate = t3.date_id