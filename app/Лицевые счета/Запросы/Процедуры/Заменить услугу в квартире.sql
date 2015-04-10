/**
 *
 * @manual 
 * @author Alexey
 * @name set_service_in_flat
 * @public
 * @rolesAllowed admin operator buh
 */ 
update lc_flat_services
set services_id = :new_Service
 Where :flatid = lc_id
 and :service_id = services_id