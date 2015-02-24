/**
 *
 * @author Alexey
 * @name dsChargesForGroup
 */ 
Select t2.services_id, sum(t.calc) AS calc, sum(t.benefit) AS benefit
, sum(t.recalc) AS recalc, sum(t.full_calc) AS full_calc, sum(t.calc_value) AS calc_value
, t3.usl_name 
From grp_lc_group t1
 Inner Join lc_flat_services t2 on t1.lc_id = t2.lc_id
 Inner Join per_sums t on t2.lc_flat_services_id = t.flat_service_id
 Inner Join #DateGroupView q on q.per_date_id = t.date_id
 Left Join usl_services t3 on t2.services_id = t3.usl_services_id
 Where :groupID = t1.group_id
 and :parAccount = t2.account_id
 and (t.calc != null or t.calc!= 0)
 and (t.full_calc != null or t.full_calc!= 0)
 Group by t2.services_id, t3.usl_name