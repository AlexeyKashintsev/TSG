/**
 *
 * @author Alexey
 * @name dsPaymentsInSession
 * @writable opl_payments
 * @public
 */ 
Select t1.opl_payments_id, t1.session_id, t1.flat_id
, t1.payment_sum, t1.date_id, t1.payment_date
, t1.payment_comment, t1.bank_percent, t1.full_payment
, t.lc_regto, t.lc_flatnumber, t.registered_count
, t.lc_num, t2.grp_name
From opl_payments t1
 Inner Join lc_flat t on t1.flat_id = t.lc_flat_id
 Left Join grp_lc_group t3 on t1.flat_id = t3.lc_id
 Left Join grp_groups t2 on t3.group_id = t2.grp_groups_id
 Left Join grp_type t4 on t2.grp_type = t4.grp_type_id
 Where :sessionid = t1.session_id and t4.main_group = true