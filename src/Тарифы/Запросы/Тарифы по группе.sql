/**
 *
 * @author Алексей
 * @name TarifsInGroup
 * @public
 */ 
Select * 
From usl_tarif t1
 Where :parDate = t1.date_id
 and (:parGroup = t1.group_id or :parGroup is null and t1.group_id is null)