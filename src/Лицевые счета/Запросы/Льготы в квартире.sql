/**
 *
 * @public 
 * @author Alexey
 * @name benefits_by_flat
 */ 
Select * 
From lc_beneficiaries t1
    where :flat_id = t1.lc_id