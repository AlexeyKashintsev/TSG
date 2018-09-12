/**
 *
 * @author Alexey
 * @name dsOplSessions
 * @writable opl_sessions
 * @public
 */ 
Select t1.opl_sessions_id, t1.date_id, t1.opl_date, t1.opl_comment, t1.account_id
, count(opl_payments_id) as cnt, sum(payment_sum) as ses_sum
From opl_sessions t1
 Left Join opl_payments t2 on t1.opl_sessions_id = t2.session_id
 Where (:sessionid = t1.opl_sessions_id or :sessionid is null)
 and (:date_id = t1.date_id or :date_id is null)
 and (:account_id = t1.account_id or :account_id is null)
group by t1.opl_sessions_id, t1.date_id, t1.opl_date, t1.opl_comment, t1.account_id