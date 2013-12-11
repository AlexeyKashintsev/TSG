/**
 *
 * @author Alexey
 * @name Saldo4calc
 * @writable per_saldo_flat
 * @manual 
 */ 
Select * 
From per_saldo_flat
 Inner Join Calc_object q on q.lc_id = per_saldo_flat.lc_id
 Where :dateid = per_saldo_flat.date_id