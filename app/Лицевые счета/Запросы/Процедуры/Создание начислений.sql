/**
 *
 * @author Alexey
 * @name sums_4create
 * @manual
 * @public
 * @rolesAllowed admin operator buh
 */ 
insert into per_sums
Select nextval('seqsums') as per_usms_id, t.lc_flat_services_id as flat_service_id, :dateid as date_id
From grp_lc_group t1
 Inner Join lc_flat_services t on t1.lc_id = t.lc_id
 Left Join per_sums t2 on t.lc_flat_services_id = t2.flat_service_id and :dateid = t2.date_id
 Where (:groupid = t1.group_id or :groupid is null)
    and (:lcid = t1.lc_id or :lcid is null)
    and t2.per_sums_id is null
 
