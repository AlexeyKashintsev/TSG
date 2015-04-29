/**
 *
 * @author TSG
 * @name perSumsForCapRemont
 */ 
Select t1.* 
From per_sums t1
 Inner Join lc_flat_services t on t.lc_flat_services_id = t1.flat_service_id
 Where :parDate = t1.date_id
 and :Param1 = t1.rate
 and :parService = t.services_id