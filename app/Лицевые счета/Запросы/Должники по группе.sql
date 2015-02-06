/**
 *
 * @public 
 * @author Alexey
 * @name debt_by_group
 * @writable lc_flat
 */ 
Select q.lc_flat_id, t.group_id, q.lc_flatnumber
, q.lc_regto, q.registered_count, t2.sal_end 
From 
(select distinct t1.lc_flat_id, t1.lc_flatnumber
, t1.lc_regto, t1.registered_count
from lc_flat t1) q
 Left Join grp_lc_group t on t.lc_id = q.lc_flat_id
 Inner Join per_saldo_flat t2 on t.lc_id = t2.lc_id
 and :date_id = t2.date_id
 Where (:all_flats = true or :group_id = 0)
 and t2.sal_end > :debt
 Order by lc_flat_id