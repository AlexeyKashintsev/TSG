/**
 *
 * @author TSG
 * @name IssuesInFlat
 */ 
Select * 
From adm_issues t1
 Where :parDate = t1.date_id
 and :parGroup = t1.group_id
 and (:parFlat = t1.lc_id or :parFlat is null)