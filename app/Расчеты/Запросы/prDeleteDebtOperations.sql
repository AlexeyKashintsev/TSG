/**
 *
 * @author Алексей
 * @name prDeleteDebtOperations
 * @manual
 */ 
Select * 
From per_debt_history t1
, per_debts t
, per_saldo_flat t2
where :dateId = :lcId and :lcId = :accountId