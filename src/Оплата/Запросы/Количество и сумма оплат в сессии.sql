/**
 *
 * @author Alexey
 * @name dsSessionColAndSum
 * @public
 */ 
Select t1.session_id, count(*) as cnt, sum(payment_sum) as ses_sum
From opl_payments t1
 Where :sessionid = t1.session_id or :sessionid is null
group by t1.session_id