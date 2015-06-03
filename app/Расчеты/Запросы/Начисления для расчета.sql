/**
 *
 * @author Alexey
 * @name sums_4calc
 * @manual 
 * @writable per_sums
 */ 
Select Distinct t1.lc_id, t1.services_id, t1.fs_active
, t4.calc_formula, t4.calc_value_formula, t.per_sums_id
, t.flat_service_id, t.date_id, t.calc
, t.benefit, t.recalc, t.full_calc
, t.rate, t.calc_value, t3.def_norm, null as norm
, t1.calc_by_norm
From Calc_object q1
 Inner Join lc_flat_services t1 on q1.lc_id = t1.lc_id
 and q1.lc_id = t1.lc_id
 Inner Join per_sums t on t1.lc_flat_services_id = t.flat_service_id
 Inner Join usl_services t3 on t3.usl_services_id = t1.services_id
 Inner Join usl_calc_formula t4 on t3.calc_id = t4.usl_calc_formula_id
 Where :date_id = t.date_id