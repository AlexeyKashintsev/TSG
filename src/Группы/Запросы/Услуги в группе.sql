/**
 *
 * @public 
 * @author Алексей
 * @name dsServicesByGroup
 */ 
Select * 
From grp_services t1
 Where :parGroup = t1.group_id