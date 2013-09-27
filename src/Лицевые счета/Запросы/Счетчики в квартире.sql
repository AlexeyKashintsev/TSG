/**
 *
 * @public 
 * @author Alexey
 * @name counters_by_flat
 * @writable lc_counter
 */ 
Select * 
From lc_counter t
 Inner Join lc_flat_services t1 on t.flat_serv_id = t1.lc_flat_services_id
 Where :flat_id = t1.lc_id or :all_flats = true