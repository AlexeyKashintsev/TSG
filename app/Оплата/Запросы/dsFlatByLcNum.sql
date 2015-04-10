/**
 *
 * @author TSG
 * @name dsFlatByLcNum
 * @public
 * @rolesAllowed admin operator buh
 */ 
Select * 
From lc_flat t1
 Inner Join grp_lc_group t on t.lc_id = t1.lc_flat_id
 Where :lcNum = t1.lc_flatnumber
 and :group_id = t.group_id