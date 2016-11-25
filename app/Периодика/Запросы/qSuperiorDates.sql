/**
 *
 * @author Алексей
 * @name qSuperiorDates
 */ 
Select * 
From per_date t1
where t1.per_date >= (
    select t.per_date 
    from per_date t
    where t.per_date_id = :date_id
)
order by per_date