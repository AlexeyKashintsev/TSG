/**
 *
 * @author Alexey
 * @name dsFlatByIDorByGroup
 * @public
 */ 
Select t.grp_lc_group_id, t.lc_id, t.group_id
, t.usr_context 
From grp_lc_group t
 Left Join grp_groups tg on t.group_id = tg.grp_parent
 Where (:group_id = t.group_id or :group_id is null)
 and (:flat_id = t.lc_id or :flat_id is null)
