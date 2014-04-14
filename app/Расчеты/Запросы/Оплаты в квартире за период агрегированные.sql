/**
 * 
 * @author Alexey
 * @name flat_payments_in_period_agregare
 */
Select t1.flat_id, sum(t1.payment_sum) as paySum
From opl_payments t1
 Where :flatID = t1.flat_id
 and :beg_date < t1.payment_date
 and (:end_date >= t1.payment_date)
group by t1.flat_id