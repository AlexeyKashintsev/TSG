/**
 *
 * @author TSG
 * @name dsAccountsByGroup
 */ 
Select * 
From grp_accounts_in_group t1
 Where :GroupId = t1.group_id