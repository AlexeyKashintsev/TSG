/**
 * 
 * @author TSG
 * @manual 
 * @name new_counter
 * @public
 * @rolesAllowed admin operator buh
 */
insert into per_counter_values (per_counter_values_id, counter_id, date_id, beg_val) 
(select per_counter_values_id+3, t.counter_id, :new_date as date_id, t.end_val
from per_counter_values t
Where (:old_date = t.date_id or :old_date is null))