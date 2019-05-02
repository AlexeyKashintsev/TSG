/**
 *
 * @author Alexey
 * @name qLCInGroups
 */ 
Select Distinct t1.lc_id
From grp_lc_group t1
 Inner Join grp_groups t on t1.group_id = t.grp_groups_id
 Where :Group_ID = t1.group_id 
or (select t3.grp_parent from grp_groups t3 where :Group_ID = t3.grp_groups_id) is null