/**
 *
 * @author Alexey
 * @name lc_chars_4calc
 * @manual 
 */ 
Select q.lc_id, t.lc_char_val AS fm_value, 'LC_' || t1.char_formula_name AS fm_name 
From Calc_object q
 Left Join lc_chars t on q.lc_id = t.lc_id
 Left Join char_types t1 on t.lc_char_type = t1.char_types_id