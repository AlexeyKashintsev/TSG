/**
 *
 * @public 
 * @author Alexey
 * @name all_dates
 */ 
Select *, date_part('year', t1.per_date) as per_year,
    to_char(t1.per_date, 'Mon') as Mon, 
    date_part('year', t1.per_date) ||':'||
    to_char(t1.per_date, 'Mon') as TextDate
From per_date t1
order by t1.per_date
