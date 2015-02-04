/**
 *
 * @author Alexey
 * @name Начисления_по_группе
 */ 
Select t2.services_id, sum(t.calc) AS calc, sum(t.benefit) AS benefit
, sum(t.recalc) AS recalc, sum(t.full_calc) AS full_calc, sum(t.calc_value) AS calc_value 
From grp_lc_group t1
 Inner Join lc_flat_services t2 on t1.lc_id = t2.lc_id
 Inner Join per_sums t on t2.lc_flat_services_id = t.flat_service_id
 Inner Join #DateGroupView q on q.per_date_id = t.date_id
 Where :groupID = t1.group_id
 Group by t2.services_id