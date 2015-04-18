/**
 *
 * @author TSG
 * @name saldoWithProblem
 * @public
 * @rolesAllowed admin operator buh
 */ 
Select t1.sal_begin, t1.sal_end, t.lc_flat_id, t.lc_regto, t.lc_flatnumber, q.TextDate, t3.grp_name
From per_saldo_flat t1
 Inner Join lc_flat t on t1.lc_id = t.lc_flat_id
 Inner Join #all_dates q on t1.date_id = q.per_date_id
 Inner Join grp_lc_group t2 on t.lc_flat_id = t2.lc_id
 Inner Join grp_groups t3 on t2.group_id = t3.grp_groups_id
 Where :dateID = t1.date_id