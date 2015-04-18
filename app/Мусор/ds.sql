/**
 *
 * @author TSG
 * @name ds
 */ 
Select t.lc_flat_id, t.lc_regto, t.lc_flatnumber
, t.TextDate, t.grp_name 
From #saldoWithProblem t
 Inner Join #saldoWithProblem q on t.lc_flat_id = q.lc_flat_id
where t.sal_begin <> q.sal_end