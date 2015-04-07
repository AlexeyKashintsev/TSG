/**
 * 
 * @author TSG
 * @name dsOplFind
 */ 
Select * 
From opl_payments t1
 Where :sessionid = t1.session_id
 and :flat = t1.flat_id