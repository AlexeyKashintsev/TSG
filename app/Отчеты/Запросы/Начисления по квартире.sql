/**
 *
 * @public 
 * @author Alexey
 * @name sums_perFlatWithUslNames
 * @writable per_sums
 */ 
select * from (
Select t1.per_sums_id, t1.flat_service_id, t1.date_id
, t1.calc, t1.benefit, t1.recalc
, t1.full_calc, t1.rate, t1.calc_value
, t.lc_flat_services_id, t.lc_id, t.services_id
, t.fs_active, t2.usl_services_id, t2.usl_name
, t2.calc_id, t2.connected_service, t2.parent_service
, max(t3.grp_services_id) as grp_services_id
From per_sums t1
 Inner Join lc_flat_services t on t1.flat_service_id = t.lc_flat_services_id
 Inner Join usl_services t2 on t.services_id = t2.usl_services_id
 Left Join grp_services t3 on t.services_id = t3.services_id
 Left Join grp_lc_group t4 on t.lc_id = t4.lc_id
 and t4.group_id = t3.group_id
 Where :flat_id = t.lc_id
 and (:date_id = t1.date_id or :date_id is null)
group by t1.per_sums_id, t1.flat_service_id, t1.date_id
, t1.calc, t1.benefit, t1.recalc
, t1.full_calc, t1.rate, t1.calc_value
, t.lc_flat_services_id, t.lc_id, t.services_id
, t.fs_active, t2.usl_services_id, t2.usl_name
, t2.calc_id, t2.connected_service, t2.parent_service) q
order by q.grp_services_id