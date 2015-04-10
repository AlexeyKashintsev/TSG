/**
 *
 * @author Alexey
 * @name prApplyTarifs
 * @manual 
 * @public
 * @rolesAllowed admin operator buh
 */ 
select *
from
(Select t.services_id, t.lc_flat_services_id, t3.rate, t3.norm
From grp_lc_group t1
 Inner Join lc_flat_services t on t1.lc_id = t.lc_id
 Inner Join grp_services t2 on t.services_id = t2.services_id
 Inner Join usl_tarif t3 on t2.group_id = t3.group_id
 and t2.services_id = t3.services_id
 Where :groupid = t1.group_id
 and :dateid = t3.date_id) qt
where qt.lc_flat_services_id = per_sums.flat_service_id
 and per_sums.date_id = :dateid
    