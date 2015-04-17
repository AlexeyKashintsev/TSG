/**
 * @name 135660700473469
 * @manual
 * @public
 * @rolesAllowed admin 
 */ 
Select replicate_getActionId() AS actionCode 
From (Select COUNT(*) 
From DUMMYTABLE t1) t__getActionId