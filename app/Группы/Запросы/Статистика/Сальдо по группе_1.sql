/**
 *
 * @author Alexey
 * @name Сальдо_по_группе_1
 */ 
Select sum(t2.sal_begin) AS sal_begin, sum(t.sal_end) AS sal_end 
From grp_lc_group t1
 Inner Join per_saldo_flat t2 on t1.lc_id = t2.lc_id
 Inner Join per_saldo_flat t on t1.lc_id = t.lc_id
 Where :parGroupID = t1.group_id
 and :parDateBeg = t2.date_id
 and :parDateID = t.date_id