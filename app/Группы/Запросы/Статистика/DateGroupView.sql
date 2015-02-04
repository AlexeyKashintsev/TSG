/**
 *
 * @author TSG
 * @name DateGroupView
 */ 
Select t1.per_date_id 
From per_date t1
, #DateByID q
, #DateByID q1
 Where t1.per_date between q.per_date and q1.per_date