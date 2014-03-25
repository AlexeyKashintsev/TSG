/**
 *
 * @manual 
 * @readonly 
 * @public 
 * @author Alexey
 * @name group_chars_4calc
 */ 
Select t1.grp_char_val AS fm_value, t3.char_formula_name AS fm_name 
From grp_chars t1
 Left Join char_types t3 on t1.grp_char_type = t3.char_types_id
 Where :groupid = t1.grp_group_id