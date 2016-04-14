/**
 *
 * @author Алексей
 * @name qDebtsByLC
 * @writable per_debts
 */ 
select t1.*,min(t2.debt_remain) as debt_remain
from
(Select t1.*
From per_debts t1
 Inner Join per_saldo_flat t on t1.per_saldo = t.per_saldo_flat_id
 Where :lcId = t.lc_id
 and :accountId = t.account_id
 order by t1.debt_date
) t1
Left Join per_debt_history t2 on t1.per_debts_id = t2.debt_id
Group by t1.per_debts_id, t1.per_saldo, t1.debt_sum, t1.debt_age, t1.debt_date, t1.usr_context
Order by t1.debt_date