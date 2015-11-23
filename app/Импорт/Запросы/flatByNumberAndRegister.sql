/**
 *
 * @author Alexey
 * @name flatByNumberAndRegister
 * @public
 * @rolesAllowed admin operator buh
 * @manual
 */ 
Select * 
From lc_flat t1
 Where UPPER(:regTo) like UPPER(t1.lc_regto)
 and UPPER(:flatNumber) like UPPER(t1.lc_flatnumber)