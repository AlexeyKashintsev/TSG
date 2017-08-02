/**
 * 
 * @author Алексей
 * @name qPerenosSaldo
 */
update per_saldo_flat p0
set sal_begin = (select sal_end from per_saldo_flat p1 where p1.lc_id = p0.lc_id and p1.date_id = :old_date)
where p0.usr_context = 'interstroy' and p0.date_id = :new_date