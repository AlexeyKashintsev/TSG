/**
 *
 * @author Alexey
 * @name all_chars_4calc
 * @manual 
 */ 
Select * 
From per_sums t1
, Calc_object q
 Inner Join lc_flat_services t on q.lc_id = t.lc_id
 and t.lc_flat_services_id = t1.flat_service_id
 Left Join grp_services t2 on t2.services_id = t.services_id
 and t2.group_id = q.group_id
 Left Join grp_chars t3 on t3.grp_group_id = t2.group_id
 Left Join lc_chars t4 on t4.lc_id = t.lc_id
 Where :dateid = t1.date_id