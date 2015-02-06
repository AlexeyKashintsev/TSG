/**
 *
 * @public 
 * @author Alexey
 * @name issues_by_group
 * @writable lc_flat
 */ 
Select t1.lc_flat_id, t1.lc_flatnumber, t1.lc_regto
, t1.registered_count, t2.adm_issues_id, t2.type_issues
, t2.completed 
From lc_flat t1
 Inner Join grp_lc_group t on t.lc_id = t1.lc_flat_id
 Left Join adm_issues t2 on t.lc_id = t2.lc_id and :date_id = t2.date_id
 Where :group_id = t.group_id or :all_flats = true
Order by lc_num