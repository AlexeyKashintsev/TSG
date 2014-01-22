/**
 *
 * @public 
 * @author Alexey
 * @name services_by_flat
 */ 
Select t1.lc_flat_services_id, t1.lc_id, t1.services_id, t1.fs_active, q.grp_services_id
From lc_flat_services t1
Inner Join services_by_group q 
on t1.services_id = q.services_id
Where :flat_id = t1.lc_id or :all_flats = true
Order by grp_services_id