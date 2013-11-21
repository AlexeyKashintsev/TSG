/**
 *
 * @author Alexey
 * @name all_chars_4calc
 * @manual 
 */ 
Select * 
From Calc_object q
 Inner Join lc_flat_services t on q.lc_id = t.lc_id
 Left Join grp_services t2 on t2.services_id = t.services_id
 and t2.group_id = q.group_id
 Left Join grp_chars t3 on t3.grp_group_id = t2.group_id
 Left Join lc_chars t4 on t4.lc_id = t.lc_id
 Inner Join char_types t1 on t4.lc_char_type = t1.char_types_id