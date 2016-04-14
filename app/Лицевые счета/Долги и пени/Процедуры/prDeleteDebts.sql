/**
 *
 * @author Алексей
 * @name prDeleteDebts
 * @manual
 */ 
Select * 
From #qLCInGroups q1
, per_debts t
 Inner Join per_saldo_flat t1 on q1.lc_id = t1.lc_id
 Where :lc_id = t1.lc_id or :lc_id is null
 and :date_id = t1.date_id