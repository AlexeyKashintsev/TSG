/**
 *
 * @author Alexey
 * @name SumOfPayments
 * @manual 
 */ 
Select t1.flat_id, sum(t1.payment_sum) as pay_sum
From opl_payments t1
 Inner Join Calc_object q on q.lc_id = t1.flat_id
 Where :dateid = t1.date_id
Group by t1.flat_id