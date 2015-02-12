/**
 *
 * @author Alexey
 * @name qPaymentsInFlat
 */ 
Select t1.opl_payments_id, t1.session_id, t1.flat_id
, t1.payment_sum, t1.date_id, t1.payment_date
, t1.payment_comment, t1.usr_context, t.opl_comment 
From opl_payments t1
 Inner Join opl_sessions t on t1.session_id = t.opl_sessions_id
 Where :flat_id = t1.flat_id
 and :account_id = t.account_id