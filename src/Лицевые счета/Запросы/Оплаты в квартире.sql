/**
 *
 * @public 
 * @author Alexey
 * @name qPaymentsInFlat
 */ 
Select * 
From opl_payments t1
 Where :flat_id = t1.flat_id