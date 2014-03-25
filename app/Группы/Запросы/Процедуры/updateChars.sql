/**
 * @author Alexey
 * @manual 
 * @name updateChars
 */ 
update grp_chars
set grp_char_val = (
select sum(lc_char_val) as s
    from lc_chars t1
    inner join grp_lc_group t2 on t1.lc_id = t2.lc_id
    where t2.group_id = :group_id and t1.lc_char_type = grp_chars.grp_char_type)
where grp_chars.grp_group_id = :group_id