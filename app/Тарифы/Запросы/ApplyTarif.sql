/**
 * 
 * @author music
 * @name ApplyTarif
 * @manual
 */ 
Select t.services_id, t.lc_flat_services_id 
From grp_lc_group t1
 Inner Join lc_flat_services t on t1.lc_id = t.lc_id
 Inner Join grp_groups t2 on t2.grp_groups_id = t1.group_id
 Inner Join per_sums t3 on t3.flat_service_id = t.lc_flat_services_id
 Where (:groupid = t2.grp_groups_id or :groupid = t2.grp_parent)
 and :dateid = t3.date_id
 and :rate = t3.rate
 and :serviceId = t.services_id