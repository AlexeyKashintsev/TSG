/**
 *
 * @author Алексей
 * @name prSetStopDateForUslInFlat
 * @manual
 */ 
Select * 
From lc_flat_services t1
 Inner Join grp_lc_group t on t1.lc_id = t.lc_id
 Where :groupId = t.group_id
 and :uslugaId = t1.services_id
 and :dateId = t1.date_end