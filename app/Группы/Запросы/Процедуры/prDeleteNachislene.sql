/**
 *
 * @author Алексей
 * @name prDeleteNachislene
 * @manual
 */ 
Select t.lc_flat_services_id 
From grp_lc_group t1
, per_sums t2
 Inner Join lc_flat_services t on t1.lc_id = t.lc_id
 and t.lc_flat_services_id = t2.flat_service_id
 Where :parGroupId = t1.group_id
 and :parUslId = t.services_id
 and :parDateId = t2.date_id