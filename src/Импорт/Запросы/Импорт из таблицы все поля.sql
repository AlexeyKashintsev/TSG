/**
 * @name importFields
*/ 
Select * 
From impexceltablefields t
 Where :impFileType = t.impfile
 Order by t.cellnumber