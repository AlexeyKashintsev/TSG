/**
 *
 * @author Алексей
 * @name main_groups
 * @public
 */ 
Select * 
From grp_groups t1
 Inner Join grp_type t on t.grp_type_id = t1.grp_type
 Where t.main_group=true