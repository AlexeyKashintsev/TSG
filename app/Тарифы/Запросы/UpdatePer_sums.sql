/**
 *
 * @author Андрей
 * @name UpdatePer_sums
 * @manual
 * @public
 * @rolesAllowed admin operator buh
 */ 
Select * 
From per_sums
 Where :accountid = per_sums.recalc
 and :dateid = per_sums.date_id
 and :groupid = per_sums.flat_service_id