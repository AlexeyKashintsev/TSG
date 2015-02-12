/**
 *
 * @author Alexey
 * @name saldo_by_flat
 */ 
Select * 
From per_saldo_flat t1
 Where (:date_id = t1.date_id or :date_id is null)
 and :flat_id = t1.lc_id
 and :account_id = t1.account_id
 Order by t1.date_id