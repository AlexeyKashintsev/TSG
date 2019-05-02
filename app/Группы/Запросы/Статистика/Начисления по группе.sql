/**
 *
 * @author Alexey
 * @name dsChargesForGroup
 * @public
 * @rolesAllowed admin operator buh
 */ 
Select t2.services_id, sum(t.calc) AS calc, sum(t.benefit) AS benefit
, sum(t.recalc) AS recalc, sum(t.full_calc) AS full_calc, sum(t.calc_value) AS calc_value
, t3.usl_name 
From #DateGroupView q
 Inner Join per_sums t on q.per_date_id = t.date_id
 Inner Join lc_flat_services t2 on t2.lc_flat_services_id = t.flat_service_id
 Inner Join #qLCInGroups q1 on q1.lc_id = t2.lc_id
 Inner Join usl_services t3 on t2.services_id = t3.usl_services_id
 Where :parAccount = t2.account_id
 Group by t2.services_id, t3.usl_name