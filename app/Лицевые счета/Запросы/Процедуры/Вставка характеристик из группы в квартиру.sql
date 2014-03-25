/**
 * 
 * @public 
 * @author Alexey
 * @name insertGroupCharsLC
 * @manual 
 *
insert into lc_chars (lc_id, lc_char_type)*/
Select :FlatID as lc_id, t1.grp_char_type
From grp_chars t1
 Left Outer Join lc_chars t on t1.grp_char_type = t.lc_char_type and :FlatID = t.lc_id
 Where t.lc_id is null and :GroupID = t1.grp_group_id and t1.add_char_to_lc = true