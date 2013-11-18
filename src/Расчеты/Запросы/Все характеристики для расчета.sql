/**
 *
 * @author Alexey
 * @name all_chars_4calc
 * @manual 
 */ 
Select * 
From Calc_object q1
 Inner Join grp_chars t on q1.group_id = t.grp_group_id
 Inner Join lc_chars t1 on q1.lc_id = t1.lc_id