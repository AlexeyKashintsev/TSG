/**
 *
 * @public 
 * @author Alexey
 * @name all_dates
 */ 
Select *, date_part('year', t1.per_date) AS per_year, to_char(t1.per_date, 'Mon') AS Mon
, date_part('year', t1.per_date) || ':' || to_char(t1.per_date, 'Mon') AS TextDate 
From per_date t1
 Where ((:date_start <= t1.per_date_id) or :date_start is null)
 and ((:date_end >= t1.per_date_id) or :date_end is null)
 Order by t1.per_date