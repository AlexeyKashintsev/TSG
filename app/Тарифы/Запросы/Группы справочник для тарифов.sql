/**
 *
 * @author Алексей
 * @name dsGroupsAndAll
 * @public
 */ 
Select null as GroupID,'Общие' as Name
from dummytable
union all
Select t1.grp_groups_id as GroupID, t1.grp_name as Name
From grp_groups t1



