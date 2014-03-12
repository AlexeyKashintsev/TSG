/**
 *
 * @author Alexey
 * @name testSql
 */ 
/*Select t4.lc_regto, t4.lc_flatnumber, sum(t.calc) AS sm */
select q.lc_regto, q.lc_flatnumber, sum(calc) from (
select distinct t1.lc_id as a1, t1.lc_id, t4.lc_regto, t4.lc_flatnumber, t.calc
From lc_flat_services t1
 Inner Join per_sums t on t1.lc_flat_services_id = t.flat_service_id
 Inner Join grp_lc_group t3 on t3.lc_id = t1.lc_id
 Inner Join grp_groups t2 on t2.grp_groups_id = t3.group_id
 Inner Join lc_flat t4 on t1.lc_id = t4.lc_flat_id
 Where (139187291174888 = t2.grp_groups_id or 139187291174888 = t2.grp_parent)
 and t1.services_id in (138734584873726, 138734587499061)
 order by t1.lc_id) q
group by lc_regto, lc_flatnumber, q.a1
order by q.a1

/* Group by t1.lc_id, t4.lc_regto, t4.lc_flatnumber
order by t1.lc_id*/