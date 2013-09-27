/**
 *
 * @public 
 * @author Alexey
 * @name chars_flat
 */ 
Select * 
From lc_chars t1
 Where :flat_id = t1.lc_id or :all_flats = true