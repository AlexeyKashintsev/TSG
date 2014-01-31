/**
 *
 * @public 
 * @author Alexey
 * @name sums_perFlatWithUslNames
 * @writable per_sums
 */ 
Select t1.per_sums_id, t1.flat_service_id, t1.date_id
, t1.calc, t1.benefit, t1.recalc
, t1.full_calc, t1.rate, t1.calc_value
, t.lc_flat_services_id, t.lc_id, t.services_id
, t.fs_active, t2.usl_services_id, t2.usl_name
, t2.calc_id, t2.connected_service, t2.parent_service
, t3.grp_services_id 
From per_sums t1
 Inner Join lc_flat_services t on t1.flat_service_id = t.lc_flat_services_id
 Inner Join usl_services t2 on t.services_id = t2.usl_services_id
 Inner Join services_by_group t3 on t.services_id = t3.services_id
 Where :flat_id = t.lc_id
 and :date_id = t1.date_id
order by grp_services_id