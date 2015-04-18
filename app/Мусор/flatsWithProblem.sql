/**
 * 
 * @author TSG
 * @name flatsWithProblem
 */ 
Select t2.lc_flatnumber, t2.lc_num, (t1.sal_begin + t1.sal_calc-t1.sal_recalc-t1.sal_payments - t1.sal_end + t1.sal_penalties_old) AS sum
, t1.sal_begin, t1.sal_full_calc, t1.sal_recalc
, t1.sal_penalties_old, t1.sal_payments, t1.sal_end 
From per_saldo_flat t1
 Inner Join grp_lc_group t on t.lc_id = t1.lc_id
 Inner Join lc_flat t2 on t.lc_id = t2.lc_flat_id
 Where (:date_id = t1.date_id or :date_id is null)
 and :account_id = t1.account_id
 and :flat_id = t.group_id
 and (t1.sal_begin + t1.sal_full_calc-t1.sal_recalc-t1.sal_payments-t1.sal_end + t1.sal_penalties_old <> 0)
 Order by t2.lc_num