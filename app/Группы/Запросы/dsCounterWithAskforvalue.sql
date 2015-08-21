/**
 *
 * @author TSG
 * @name dsCounterWithAskforvalue
 */ 
Select * 
From grp_services t1
 Inner Join usl_services t on t1.services_id = t.usl_services_id
 Where :group_id = t1.group_id
 and :account_id = t1.account_id
 and t1.askforvalue = true