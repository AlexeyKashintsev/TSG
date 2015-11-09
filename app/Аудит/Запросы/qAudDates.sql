/**
 *
 * @author Алексей
 * @name qAudDates
 */ 
Select *, date_part('year', t1.per_date) ||':'||
    to_char(t1.per_date, 'Mon') as TextDate
From per_date t1
 Where :par_client = t1.usr_context