/**
 *
 * @author TSG
 * @name saldoByEnd
 */ 
Select t2.lc_flatnumber
From per_saldo_flat t1
 Inner Join grp_lc_group t on t.lc_id = t1.lc_id
 Inner Join lc_flat t2 on t1.lc_id = t2.lc_flat_id
 Where :parEnd = t1.sal_full_calc
 and :parAccount = t1.account_id
 and :parGrp = t.group_id