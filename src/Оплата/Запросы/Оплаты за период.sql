/**
 *
 * @author Alexey
 * @name Оплаты_за_период
 * @public
 * @manual
 */ 
Select * 
From opl_payments t1
 Left Join grp_lc_group t on t.lc_id = t1.flat_id
 Where :dateId = t1.date_id
 and (:flatId = t1.flat_id or :flatId is null)
 and (:groupid = t.group_id or :groupid is null)
 Order by payment_date