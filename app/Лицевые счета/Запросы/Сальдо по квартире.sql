/**
 *
 * @author Alexey
 * @name saldo_by_flat
 * @public
 * @rolesAllowed admin operator buh
 */ 
Select * 
From per_saldo_flat t1
 Where (:date_id = t1.date_id or :date_id is null)
 and :flat_id = t1.lc_id
 and :account_id = t1.account_id
 and ((:date_start <= t1.date_id or :date_start is null) and (:date_end >= t1.date_id or :date_end is null))
 Order by t1.date_id