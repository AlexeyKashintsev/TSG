/**
 *
 * @public 
 * @manual 
 * @author Alexey
 * @name insertGroupServicesLC
 *
insert into lc_flat_services(lc_id, services_id, fs_active)*/ 
Select :FlatID AS lc_id, t.services_id, true AS fs_active
, t3.calc_by_counter, t.account_id 
From grp_services t
 Left Outer Join lc_flat_services t1 on t.services_id = t1.services_id
 and :FlatID = t1.lc_id
 Inner Join usl_services t2 on t.services_id = t2.usl_services_id
 Inner Join usl_calc_formula t3 on t2.calc_id = t3.usl_calc_formula_id
 Where :GroupID = t.group_id
 and t1.lc_id is null