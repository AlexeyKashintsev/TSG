/**
 *
 * @author Алексей
 * @name dsLCByCode
 */ 
Select t2.lc_flat_id 
From grp_groups t1
 Inner Join grp_lc_group t on t.group_id = t1.grp_groups_id
 Inner Join lc_flat t2 on t.lc_id = t2.lc_flat_id
 Where (:grp_code = t1.grpid or :grp_code is null)
 and :flat_code = t2.lc_num
 or :lc_num = t2.lc_num