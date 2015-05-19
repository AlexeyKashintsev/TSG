/**
 *
 * @author Алексей
 * @name dsMainGroupByLCWithAccounts
 */ 
Select t.grp_accounts_in_group_id, t.group_id, t.account_id
, t.bank_id, t.usr_context, t.calculate_peni 
From grp_lc_group t1
 Inner Join grp_accounts_in_group t on t1.group_id = t.group_id
 Inner Join grp_groups t2 on t.group_id = t2.grp_groups_id
 Inner Join grp_type t3 on t2.grp_type = t3.grp_type_id
 Where (:lc_id = t1.lc_id or :lc_id is null)
 and (:account_id = t.account_id or :account_id is null)
 and (:group_id = t1.group_id or :group_id is null)
 and t3.main_group = true
group by t.grp_accounts_in_group_id, t.group_id, t.account_id
, t.bank_id, t.usr_context, t.calculate_peni 