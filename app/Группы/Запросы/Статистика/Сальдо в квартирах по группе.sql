/**
 *
 * @procedure 
 * @author Alexey
 * @name saldo_in_flats_by_group
 * @writable per_saldo_flat
 * @manual
 */ 
Select * 
From per_saldo_flat t1
 Where (:date_id = t1.date_id or :date_id is null)
