/**
 *
 * @author Алексей
 * @name qDebtById
 */ 
Select * 
From per_debt_history t1
 Where :debt_id = t1.debt_id
order by t1.per_debt_history_id