/**
 *
 * @author Алексей
 * @name qMainGroups
 * @public
 */ 

Select t1.grp_groups_id, t1.grp_name, t1.grp_parent, t1.grp_type, t1.grp_address
, t1.bank, t1.grp_number, t1.usr_context, t1.grpid
From grp_groups t1
 Inner Join grp_type t on t.grp_type_id = t1.grp_type
 Where t.main_group = true and :show_all_option = true