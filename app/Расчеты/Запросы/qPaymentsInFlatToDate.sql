/**
 *
 * @author Алексей
 * @name qPaymentsInFlatToDate
 */ 
Select * 
From opl_payments t1
 Where :lcId = t1.flat_id
 and :dateId = t1.date_id
order by t1.payment_date