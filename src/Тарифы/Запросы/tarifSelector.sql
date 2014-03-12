/**
 * 
 * @author Alexey
 * @name tarifSelector
 */
Select *
From grp_lc_group t1
 Inner Join lc_flat_services t on t1.lc_id = t.lc_id
 Inner Join usl_tarif t3 on t.services_id = t3.services_id
 and t1.group_id = t3.group_id
 Inner Join grp_groups t2 on t2.grp_groups_id = t1.group_id
Where :dateid = t3.date_id
 and (:groupid = t2.grp_groups_id
 or :groupid = t2.grp_parent)
and (t.lc_flat_services_id = 139413695271580 or t.lc_flat_services_id = 139413695282495)
