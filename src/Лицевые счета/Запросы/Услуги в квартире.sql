/**
 *
 * @public 
 * @author Alexey
 * @name services_by_flat
 */ 
Select * 
From lc_flat_services t1
 Where :flat_id = t1.lc_id or :all_flats = true