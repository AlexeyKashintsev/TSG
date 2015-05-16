/**
 *
 * @author Alexey
 * @name FlatServiceByServiceAndFlatID
 * @manual 
 * @public
 */ 
Select * 
From lc_flat_services t1
 Where :LC_ID = t1.lc_id
 and :ServiceID = t1.services_id