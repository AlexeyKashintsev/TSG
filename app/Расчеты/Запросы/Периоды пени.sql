/**
 *
 * @author Алексей
 * @name qPeniPeriods
 */ 
Select * 
From per_peni_periods t1
 Where :dateId = t1.date_id
order by t1.debt_age