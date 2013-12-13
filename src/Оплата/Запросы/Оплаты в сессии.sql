/**
 *
 * @author Alexey
 * @name dsPaymentsInSession
 * @manual 
 */ 
Select * 
From opl_payments t1
 Where :sessionid = t1.session_id