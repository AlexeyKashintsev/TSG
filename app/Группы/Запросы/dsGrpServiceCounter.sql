/**
 *
 * @author postgres
 * @name dsGrpServiceCounter
 * @public
 * @rolesAllowed admin operator buh
 */ 
Select * 
From grp_service_counters t1
 Where :parGrpServ = t1.grp_service_id