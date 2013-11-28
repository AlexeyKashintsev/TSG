/**
 *
 * @author Alexey
 * @name services_with_chars_cross
 * @manual 
 */ 
Select * 
From Calc_object q1
 Inner Join group_chars_4calc q on q1.group_id = q.group_id
 Inner Join lc_chars_4calc q2 on q1.lc_id = q2.lc_id