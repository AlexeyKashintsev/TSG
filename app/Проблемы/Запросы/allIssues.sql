/**
 *
 * @author TSG
 * @name allIssues
 * @writable adm_issues
 * @public
 * @rolesAllowed admin operator buh
 */ 
Select t1.adm_issues_id, t2.grp_name, t3.lc_flatnumber
, t3.lc_regto, t.type_name, date_part('year', t4.per_date) ||':'||
    to_char(t4.per_date, 'Mon') as TextDate, t1.issue_comment,
t2.grp_groups_id, t3.lc_flat_id, t4.per_date_id 
From adm_issues t1
 Left Join adm_issues_types t on t1.type_issues = t.adm_issues_types_id
 Inner Join grp_groups t2 on t1.group_id = t2.grp_groups_id
 Inner Join lc_flat t3 on t1.lc_id = t3.lc_flat_id
 Inner Join per_date t4 on t1.date_id = t4.per_date_id
order by grp_name,lc_flat_id