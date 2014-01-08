/**
 *
 * @public 
 * @author Alexey
 * @name sums_perFlatWithUslNames
 * @writable per_sums
 */ 
Select * 
From per_sums t1
 Inner Join lc_flat_services t on t1.flat_service_id = t.lc_flat_services_id
 Inner Join usl_services t2 on t.services_id = t2.usl_services_id
 Where :flat_id = t.lc_id
 and :date_id = t1.date_id