/**
 *
 * @author Алексей
 * @name groups_query
 * @public
 */ 
Select * 
From grp_groups t1
 Where :izolation = t1.usr_context or :izolation is null