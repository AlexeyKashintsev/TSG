/**
 *
 * @author Алексей
 * @name qDebtsByLC
 * @writable per_debts
 */ 
Select t1.* 
From per_debts t1
 Inner Join per_saldo_flat t on t1.per_saldo = t.per_saldo_flat_id
 Where :lcId = t.lc_id
 and t1.debt_remain > 0
 and :accountId = t.account_id
Order By t.date_id