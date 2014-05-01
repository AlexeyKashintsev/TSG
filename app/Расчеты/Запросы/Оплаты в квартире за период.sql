/**
 *
 * @author Alexey
 * @name flat_payments_in_period
 */ 
Select * 
From opl_payments t1
 Where :flatID = t1.flat_id
 and :beg_date < t1.payment_date
 and (:end_date >= t1.payment_date)
order by t1.payment_date