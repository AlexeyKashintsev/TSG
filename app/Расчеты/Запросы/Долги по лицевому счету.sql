/**
 *
 * @author Алексей
 * @name qDebtsByLc
 * @readonly
 */ 
select * from (
    Select t.per_saldo_flat_id as debt_id, t.sal_full_calc AS debt_sum, t2.per_pay_day, sum(t1.debt_paid) as debt_paid
    , sum(peni_calculated) as peni_calculated, sum(peni_paid) as peni_paid
    From per_debt_history t1
     Inner Join per_saldo_flat t on t1.debt_id = t.per_saldo_flat_id
     Inner Join per_date t2 on t.date_id = t2.per_date_id
     Where :lcId = t.lc_id
     and (:dateId = t.date_id or :dateId is null)
     and :anAccountId = t.account_id
    group by t.per_saldo_flat_id, t2.per_pay_day) q
where :only_active = false or q.debt_sum > q.debt_paid or peni_calculated > peni_paid