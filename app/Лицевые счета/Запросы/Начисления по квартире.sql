/**
 *
 * @public 
 * @author Alexey
 * @name sums_perFlat
 * @writable per_sums
 */ 
Select * 
From (Select t1.per_sums_id, t1.flat_service_id, t1.date_id
, t1.calc, t1.benefit, t1.recalc
, t1.full_calc, t1.rate, t1.calc_value
, t.lc_flat_services_id, t.lc_id, t.services_id
, t.fs_active, max(t3.grp_services_id) AS grp_services_id 
From per_sums t1
 Left Join lc_flat_services t on t1.flat_service_id = t.lc_flat_services_id
 Left Join grp_lc_group t2 on t.lc_id = t2.lc_id
 Left Join grp_services t3 on t2.group_id = t3.group_id
 and t.services_id = t3.services_id
 Where :flat_id = t.lc_id
 and :date_id = t1.date_id
 and :parAccount = t.account_id
 and :parAccount = t3.account_id
 and (t1.calc != null or t1.calc!= 0)
 and (t1.full_calc != null or t1.full_calc!= 0)
 Group by t1.per_sums_id, t1.flat_service_id, t1.date_id, t1.calc, t1.benefit, t1.recalc, t1.full_calc, t1.rate, t1.calc_value, t.lc_flat_services_id, t.lc_id, t.services_id, t.fs_active) q
 Order by q.grp_services_id