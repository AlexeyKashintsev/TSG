/**
 * 
 * @author Алексей
 * @name qCounterVal6Year
 */
select round(sum(q.end_val - q.beg_val)/6) as val
from (
select * from per_date pd
inner join per_counter_values cv on cv.date_id = pd.per_date_id
where pd.per_date_id <= :date and cv.counter_id = :counter
order by per_date desc
limit 6) q