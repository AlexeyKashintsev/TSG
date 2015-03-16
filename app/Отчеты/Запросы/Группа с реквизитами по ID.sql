/**
 *
 * @author Alexey
 * @name dsGroupAndBank
 */ 
Select *
From grp_bank t
 Inner Join grp_accounts_in_group t2 on t2.bank_id = t.grp_bank_id
 Inner Join grp_groups t1 on t2.group_id = t1.grp_groups_id
 Where :groupID = t2.group_id
 and :accountID = t2.account_id