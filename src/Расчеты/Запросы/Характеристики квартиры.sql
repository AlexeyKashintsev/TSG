/**
 *
 * @author Alexey
 * @name lc_chars_4calc
 * @manual 
 */ 
Select t.lc_char_val AS fm_value, t1.char_formula_name AS fm_name 
From lc_chars t
 Left Join char_types t1 on t.lc_char_type = t1.char_types_id
 Where :lc_id = t.lc_id