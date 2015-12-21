/**
 *
 * @author Alexey
 * @name qLcFlatAndSaldo4Report
 */ 
Select * 
From #qLCInGroups q1
inner join per_saldo_flat psf on psf.lc_id = q1.lc_id
where psf.date_id = :date_id and psf.account_id = :account_id