/**
 *
 * @public 
 * @author Alexey
 * @name debt_by_group
 * @writable lc_flat
 */ 
Select t1.lc_flat_id, t.group_id, t1.lc_flatnumber
, t1.lc_regto, t1.registered_count, t2.sal_end 
From lc_flat t1
 Inner Join grp_lc_group t on t.lc_id = t1.lc_flat_id
 Inner Join qMainGroups q on t.group_id = q.grp_groups_id
 Left Join per_saldo_flat t2 on :date_id = t2.date_id and :account_id = t2.account_id
 and t1.lc_flat_id = t2.lc_id
 Where (:group_id = t.group_id or :all_flats = true or :group_id = 0)
 and t2.sal_end > :debt
 Order by lc_flat_id