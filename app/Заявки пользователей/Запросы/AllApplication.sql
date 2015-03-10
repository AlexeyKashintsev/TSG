/**
 *
 * @author TSG
 * @name AllApplication
 */ 
Select t1.usr_user_id, t1.lc_flat_id, t3.lc_regto
, t3.lc_flatnumber, t2.grp_name, t1.phone_number
, t1.password, t1.active, t1.date
, t1.email 
From usr_user t1
 Inner Join grp_lc_group t on t1.lc_flat_id = t.lc_id
 Inner Join grp_groups t2 on t.group_id = t2.grp_groups_id
 Inner Join lc_flat t3 on t1.lc_flat_id = t3.lc_flat_id
 Inner Join grp_type t4 on t4.grp_type_id = t2.grp_type
 Where (t1.active = false or t1.active = null)
 and t4.main_group = true