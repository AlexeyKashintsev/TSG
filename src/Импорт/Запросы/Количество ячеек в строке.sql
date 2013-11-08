/**
 *
 * @public 
 * @author Алексей
 * @name Количество_ячеек_в_строке
 */ 
Select max(cellnumber) as rowLength
From impexceltablefields t1
 Where :importType = t1.impfile