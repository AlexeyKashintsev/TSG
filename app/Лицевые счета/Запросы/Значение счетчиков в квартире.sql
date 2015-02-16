/**
 *
 * @author Alexey
 * @name counters_values_by_flat
 * @writable per_counter_values
 */ 
Select t.per_counter_values_id, t.counter_id, t.date_id
, t.end_val, t.beg_val, t.end_val-t.beg_val AS cons_val
, t1.lc_id, t1.services_id , t2.askforvalue, t2.askinbills
From counters_by_flat q1
 Inner Join per_counter_values t on q1.counter_id = t.counter_id
 Inner Join lc_flat_services t1 on q1.flat_service = t1.lc_flat_services_id
 and :parAccount = t1.account_id
 Inner Join grp_services t2 on t2.services_id = t1.services_id and :parAccount = t2.account_id
 Inner Join grp_lc_group t3 on t1.lc_id = t3.lc_id
 and t3.group_id = t2.group_id
 Where :date_id = t.date_id and t2.askforvalue = true
 order by t2.grp_services_id