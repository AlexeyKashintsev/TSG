/**
 *
 * @public 
 * @author Alexey
 * @name services_by_flat
 * @writable lc_flat_services
 */ 
Select * 
From (Select max(t2.grp_services_id) AS grp_services_id, t1.lc_flat_services_id, t1.lc_id
, t1.services_id, t1.fs_active, t1.date_start
, t1.date_end, t1.period_start, t1.period_end, t1.account_id
From lc_flat_services t1
 Left Join grp_lc_group t on t1.lc_id = t.lc_id
 Left Join grp_services t2 on t.group_id = t2.group_id
 and t2.services_id = t1.services_id
 and :parAccount = t2.account_id
 Where :parAccount = t1.account_id
 and (:flat_id = t1.lc_id or :all_flats = true)
 Group by t1.lc_flat_services_id, t1.lc_id, t1.services_id, t1.fs_active
, t1.date_start, t1.date_end, t1.period_start, t1.period_end, t1.account_id) q
 /*Order by grp_services_id*/