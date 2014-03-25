/**
 *
 * @author Alexey
 * @name Сальдо_по_группе
 */ 
Select t2.date_id, sum(t2.sal_begin) AS sal_begin, sum(t2.sal_benefit) AS sal_benefit
, sum(t2.sal_calc) AS sal_calc, sum(t2.sal_end) AS sal_end, sum(t2.sal_full_calc) AS sal_full_calc
, sum(t2.sal_payments) AS sal_payments, sum(t2.sal_penalties_cur) AS sal_penalties_cur, sum(t2.sal_recalc) AS sal_recalc 
From grp_lc_group t1
 Inner Join per_saldo_flat t2 on t1.lc_id = t2.lc_id
 Where :parGroupID = t1.group_id
 and (:parDateID = t2.date_id or :parDateID is null)
 Group by t2.date_id