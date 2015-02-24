/**
 *
 * @author Alexey
 * @name flat_payments_in_period
 */ 
Select * 
From opl_payments t1
 Inner Join opl_sessions t on t.opl_sessions_id = t1.session_id and :accountID = t.account_id
 Where :flatID = t1.flat_id
 and :beg_date < t1.payment_date
 and (:end_date >= t1.payment_date)
 Order by t1.payment_date