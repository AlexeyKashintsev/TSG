/**
 *
 * @author Алексей
 * @name prClearTarifs
 * @manual 
 */ 
Select * 
From per_sums t
 Inner Join lc_flat_services t2 on t2.lc_flat_services_id = t.flat_service_id
 Inner Join grp_lc_group t1 on t2.lc_id = t1.lc_id
 Where :parAccountID = t2.account_id
 and :parDateID = t.date_id
 and :parGroupID = t1.group_id