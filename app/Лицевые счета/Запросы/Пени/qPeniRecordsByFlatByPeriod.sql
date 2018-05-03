/**
 *
 * @author Алексей
 * @name qPeniRecordsByFlatByPeriod
 */ 
Select t.debt_date, t3.*, t.debt_sum, t.debt_date, t2.per_date, q1.peni_rate, q1.s_age, q.TextDate
From per_saldo_flat t1
 Left Join per_debts t on t.per_saldo = t1.per_saldo_flat_id
 Left Join per_debt_history t3 on t3.debt_id = t.per_debts_id
 Left Join per_date t2 on t1.date_id = t2.per_date_id
 Left Join #qPeniPeriodsStartStop q1 on q1.date_id = t3.date_id
 and q1.s_age <= t3.debt_age_days
 and (q1.e_age > t3.debt_age_days or q1.e_age is null)
 Inner Join #all_dates q on t3.date_id = q.per_date_id
 Where :flat = t1.lc_id
 and :account = t1.account_id
 Order by t3.date_id, t3.debt_id, t3.op_date