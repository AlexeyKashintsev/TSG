/**
 *
 * @author Alexey
 * @name dsGroupAndBank
 */ 
Select t.grp_bank_id, t.grp_fname, t.bank_name, t.bank_account, t.bank_bik,
t.bank_correction, t.grp_short_name, t.percent, t.usr_context 
From grp_bank t
 Inner Join grp_accounts_in_group t2 on t2.bank_id = t.grp_bank_id
 Where :groupID = t2.group_id
 and :accountID = t2.account_id