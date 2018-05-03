/**
 *
 * @author Алексей
 * @name qPeniSumByFlatAndDate
 */ 
Select t1.*, q.* 
From per_debt_history t1
 Inner Join per_debts t on t1.debt_id = t.per_debts_id
 Inner Join #qPeniPeriodsStartStop q on q.date_id = t1.date_id
     and t1.debt_age_days >= q.s_age and (t1.debt_age_days < q.e_age or q.e_age is null)
 Inner Join per_saldo_flat t3 on t.per_saldo = t3.per_saldo_flat_id
 Where :flat_id = t3.lc_id
 and :account_id = t3.account_id
