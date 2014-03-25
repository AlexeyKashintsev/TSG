/**
 *
 * @author Alexey
 * @name dsGroupAndBank
 */ 
Select * 
From grp_groups t1
 Left Join grp_bank t on t1.bank = t.grp_bank_id
 Where :groupID = t1.grp_groups_id