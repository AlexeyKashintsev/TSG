/**
 *
 * @author Alexey
 * @name dsOplById
 * @manual 
 * @public
 * @rolesAllowed admin operator buh
 */ 
Select * 
From opl_payments t1
where t1.opl_payments_id = :paymentid