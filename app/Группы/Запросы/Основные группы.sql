/**
 *
 * @author Алексей
 * @name qMainGroups
 * @public
 */ 
select * 
from (
Select t1.grp_groups_id, t1.grp_name, t1.grp_parent, t1.grp_type, t1.grp_address
, t1.bank, t1.grp_number, t1.usr_context, t1.grpid
From grp_groups t1
 Inner Join grp_type t on t.grp_type_id = t1.grp_type
 Where t.main_group = true
union all 
select 0 as grp_groups_id, 'Все' as grp_name, null as grp_parent, null as grp_type, null as grp_address
, null as bank, null as grp_number, null as usr_context, null as grpid
From grp_groups t2
where :show_all_option = true) q
group by grp_groups_id, grp_name, grp_parent, grp_type, grp_address
, bank, grp_number, usr_context, grpid
order by grp_groups_id