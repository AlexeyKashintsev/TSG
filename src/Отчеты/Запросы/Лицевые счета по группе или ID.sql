/**
 *
 * @author Alexey
 * @name dsFlatByIDorByGroup
 * @public
 */ 
Select * 
From grp_lc_group t
 Where (:group_id = t.group_id or :group_id is null)
 and (:flat_id = t.lc_id or :flat_id is null)