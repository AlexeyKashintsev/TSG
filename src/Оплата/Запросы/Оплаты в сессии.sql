/**
 *
 * @author Alexey
 * @name dsPaymentsInSession
 * @writable opl_payments
 * @manual 
 */ 
Select * 
From opl_payments t1
 Inner Join lc_flat t on t1.flat_id = t.lc_flat_id
 Where :sessionid = t1.session_id