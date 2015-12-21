/**
 *
 * @author Alexey
 * @name qLcFlatAndSaldo4Report
 */ 
Select * 
From #qLCInGroups q1
 Inner Join per_saldo_flat psf on psf.lc_id = q1.lc_id
 Inner Join lc_flat t on q1.lc_id = t.lc_flat_id
 Where psf.date_id = :date_id
 and psf.account_id = :account_id