/**
 * 
 * @author Alexey
 * @name a1234
 * @writable per_saldo_flat
 */ 
Select sf.per_saldo_flat_id, sf.sal_begin, t1.lc_flatnumber
, t1.lc_regto 
From per_saldo_flat sf
 Inner Join grp_lc_group t on sf.lc_id = t.lc_id
 Inner Join lc_flat t1 on sf.lc_id = t1.lc_flat_id
 Inner Join grp_groups t2 on t2.grp_groups_id = t.group_id
 Where sf.date_id = :dateID
 and (:groupid = t2.grp_groups_id or :groupid = t2.grp_parent)
 Order by t1.lc_num