/**
 *
 * @public 
 * @author Alexey
 * @name flats_by_group
 * @writable lc_flat
 */ 
Select * 
From lc_flat t1
 Left Join grp_lc_group t on t.lc_id = t1.lc_flat_id
 Where :group_id = t.group_id or :all_flats = true