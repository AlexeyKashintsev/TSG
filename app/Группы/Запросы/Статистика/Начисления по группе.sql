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
From grp_lc_group t1
 Inner Join lc_flat_services t2 on t1.lc_id = t2.lc_id
 Inner Join per_sums t on t2.lc_flat_services_id = t.flat_service_id
 Inner Join #DateGroupView q on q.per_date_id = t.date_id
 Left Join usl_services t3 on t2.services_id = t3.usl_services_id
 Left Join grp_services t4 on t2.services_id = t4.services_id
         and t1.group_id = t4.group_id and :parAccount = t4.account_id
 Where (:groupID = t1.group_id or :all_flats = true)
 and :parAccount = t2.account_id

 Group by t2.services_id, t3.usl_name, t4.grp_services_id
 order by t4.grp_services_id