/**
 *
 * @author Alexey
 * @name all_chars_4calc
 * @manual 
 */ 
Select q.lc_flat_id as flatID, q.registered_count, t.services_id, t.fs_active
From Calc_object q
 Inner Join lc_flat_services t on q.lc_id = t.lc_id
 Left Join grp_services t2 on t2.services_id = t.services_id
 and t2.group_id = q.group_id