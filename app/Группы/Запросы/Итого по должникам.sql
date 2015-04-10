/**
 *
 * @author TSG
 * @name dsStatDebt
 * @public
 * @rolesAllowed admin operator buh
 */ 
Select count(q1.lc_flat_id) as count, sum(q1.Debt) as sum 
From #debt_by_group q1