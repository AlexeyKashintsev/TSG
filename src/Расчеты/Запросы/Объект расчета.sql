/**
 *
 * @author Alexey
 * @name Calc_object
 * @manual 
 */ 
Select * 
From lc_flat t1
 Inner Join grp_lc_group t on t.lc_id = t1.lc_flat_id
 Where (:groupid = t.group_id or :groupid is null)
 and (:lc_id = t1.lc_flat_id or :lc_id is null)