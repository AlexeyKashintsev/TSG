/**
 *
 * @author Alexey
 * @name Начисления_в_группе
 */ 
Select * 
From grp_lc_group t1
 Inner Join lc_flat_services t on t1.lc_id = t.lc_id
 Where :group_id = t1.group_id