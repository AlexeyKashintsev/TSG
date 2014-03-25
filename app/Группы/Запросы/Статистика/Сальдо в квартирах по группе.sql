/**
 *
 * @procedure 
 * @author Alexey
 * @name saldo_in_flats_by_group
 * @writable per_saldo_flat
 */ 
Select t1.per_saldo_flat_id, t1.lc_id, t1.date_id, t1.sal_begin, t1.sal_benefit
, t1.sal_calc, t1.sal_calc, t1.sal_end, t1.sal_full_calc, t1.sal_payments
, t1.sal_penalties_cur, t1.sal_penalties_old, t1.sal_recalc, t1.usr_context
From  grp_lc_group t2
 Inner Join per_saldo_flat t1 on t2.lc_id = t1.lc_id
 Where (:date_id = t1.date_id or :date_id is null)
 and :group_id = t2.group_id