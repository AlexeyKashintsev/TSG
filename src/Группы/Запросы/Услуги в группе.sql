/**
 *
 * @public 
 * @author Алексей
 * @name services_by_group
 */ 
Select * 
From grp_services t1
 Where :parGroup = t1.group_id