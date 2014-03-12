/**
 *
 * @author Alexey
 * @name Начисления_по_группе
 */ 
Select t2.services_id, sum(t.calc) as calc, sum(t.benefit) as benefit
, sum(t.recalc) as recalc, sum(t.full_calc) as full_calc
, sum(t.calc_value) as calc_value
From grp_lc_group t1
 Inner Join lc_flat_services t2 on t1.lc_id = t2.lc_id
 Inner Join per_sums t on t2.lc_flat_services_id = t.flat_service_id
 Where :groupID = t1.group_id
 and :dateID = t.date_id
group by t2.services_id