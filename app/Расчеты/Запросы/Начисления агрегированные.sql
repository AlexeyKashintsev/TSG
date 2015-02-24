/**
 * 
 * @author Alexey
 * @name SumOfSums
 * @manual
 */ 
Select t1.lc_id, sum(t.calc) AS sal_calc, sum(t.benefit) AS sal_benefit, sum(t.recalc) AS sal_recalc
, sum(t.full_calc) AS sal_full_calc 
From per_sums t
 Inner Join lc_flat_services t1 on t1.lc_flat_services_id = t.flat_service_id and :accountid = t1.account_id
 Inner Join Calc_object q on q.lc_id = t1.lc_id
 Where :dateid = t.date_id
 Group by t1.lc_id