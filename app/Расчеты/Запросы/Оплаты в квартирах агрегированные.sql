/**
 *
 * @author Alexey
 * @name SumOfPayments
 * @manual 
 */ 
Select t1.flat_id, sum(t1.payment_sum) AS pay_sum 
From opl_payments t1
 Inner Join Calc_object q on q.lc_id = t1.flat_id
 Inner Join opl_sessions t on t.opl_sessions_id = t1.session_id
 Where :dateid = t1.date_id
 and :dateid = t.date_id
 and :accountid = t.account_id
 Group by t1.flat_id