/**
 *
 * @author Алексей
 * @name qPeniPeriods_2
 */ 
Select *, null AS rnum 
From per_peni_periods t1
 Where :date_id = t1.date_id
 and :date_end = t1.date_id