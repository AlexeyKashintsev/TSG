/**
 *
 * @author TSG
 * @name dsAccountsByGroup
 */ 
Select t1.grp_accounts_in_group_id, t1.group_id, t1.account_id, t.account_name 
From grp_accounts_in_group t1
 Inner Join grp_account t on t1.account_id = t.grp_account_id
 Where :GroupId = t1.group_id