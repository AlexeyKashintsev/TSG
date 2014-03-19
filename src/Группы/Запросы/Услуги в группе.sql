/**
 *
 * @public 
 * @author Алексей
 * @name services_by_group
 * @writable grp_services
 */ 
Select t1.grp_services_id, t1.group_id, t1.services_id
, t1.usr_context, t1.modified_service_id, t.calc_by_counter
, t1.askforvalue, t1.askinbills
, case when :parGroup = t3.grp_parent then t3.grp_name else '' end as childService
From grp_services t1
 Inner Join usl_services t2 on t1.services_id = t2.usl_services_id
 Inner Join usl_calc_formula t on t2.calc_id = t.usl_calc_formula_id
 and t2.calc_id = t.usl_calc_formula_id
 Inner Join grp_groups t3 on t3.grp_groups_id = t1.group_id
 Where :parGroup = t3.grp_parent
 or :parGroup = t3.grp_groups_id
 Order by grp_services_id