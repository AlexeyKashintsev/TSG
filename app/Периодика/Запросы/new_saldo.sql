/**
 *
 * @author TSG
 * @name new_saldo
 */ 
insert into per_saldo_flat(date_id,lc_id,sal_begin,sal_penalties_old) 
values (:new_date,
(select t.lc_id,
t.sal_end,
t.sal_penalties_old + t.sal_penalties_cur
from per_saldo_flat t
Where (:old_date = t.date_id or :old_date is null)))





