/**
 * 
 * @author TSG
 * @name new_tarif
 */
insert into usl_tarif (usl_tarif_id, services_id, date_id, group_id, rate, norm) 
(select t.usl_tarif_id+1, t.services_id, :new_date as date_id, t.group_id,
t.rate, t.norm
from usl_tarif t
Where (:old_date = t.date_id or :old_date is null))