/**
 *
 * @public 
 * @manual 
 * @author music
 * @name prUpdateOwner
 */ 
Select * 
From per_flat_owner t1
 Where :perSaldoFlat = t1.per_flat_owner_id
 and :lcRegTo = t1.owner_fio
 and :dateId = t1.date_id
 and :lcId = t1.lc_id