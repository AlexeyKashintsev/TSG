/**
 *
 * @author Алексей
 * @name qPeniPeriodsStartStop
 */ 
Select q.debt_age AS s_age, q1.debt_age AS e_age, q.peni_rate
, q.date_id 
From #qPeniPeriods_1 q
 Left Join #qPeniPeriods_2 q1 on q1.rnum = q.rnum + 1
 and q1.date_id = q.date_id