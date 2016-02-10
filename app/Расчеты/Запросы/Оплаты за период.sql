/**
 *
 * @author Alexey
 * @name qPaymentsByDate
 * @public
 * @manual
 */ 
Select t1.* 
From opl_payments t1
 Inner Join opl_sessions t2 on t1.session_id = t2.opl_sessions_id
 Where :dateId = t1.date_id
 and (:flatId = t1.flat_id or :flatId is null)
 and :accountId = t2.account_id
 Order by payment_date