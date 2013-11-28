/**
 *
 * @author Alexey
 * @name sums_4calc
 * @manual 
 * @writable per_sums
 */ 
Select t1.lc_id, t1.fs_active, t.per_sums_id
, t.flat_service_id, t.date_id, t.calc
, t.benefit, t.recalc, t.full_calc
, t.rate 
From Calc_object q1
 Inner Join lc_flat_services t1 on q1.lc_id = t1.lc_id
 Inner Join per_sums t on t1.lc_flat_services_id = t.flat_service_id
 Where :date_id = t.date_id