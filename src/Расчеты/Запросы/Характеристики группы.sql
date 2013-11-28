/**
 *
 * @manual 
 * @readonly 
 * @public 
 * @author Alexey
 * @name group_chars_4calc
 */ 
Select q.group_id, t1.grp_char_val AS fm_value, 'GRP_' || t3.char_formula_name AS fm_name 
From Calc_object q
 Left Join grp_chars t1 on q.group_id = t1.grp_group_id
 Left Join char_types t3 on t1.grp_char_type = t3.char_types_id