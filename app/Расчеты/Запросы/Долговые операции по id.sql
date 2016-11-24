/**
 *
 * @author Алексей
 * @name qDebtById
 */ 
Select * 
From per_debt_history t1
 Where :debt_id = t1.debt_id
    and (:date_id >= t1.date_id or :date_id is null)
order by t1.per_debt_history_id