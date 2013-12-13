/**
 *
 * @author Андрей
 * @name UpdatePer_sums
 */ 
Select *
From ApplyTarifs q
 Inner Join per_sums t on q.lc_flat_services_id = t.flat_service_id