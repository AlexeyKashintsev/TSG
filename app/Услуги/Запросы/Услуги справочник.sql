/**
 *
 * @author Алексей
 * @name qServices
 * @public
 * @writable usl_services
 */ 
Select t1.usl_services_id, t1.usl_name, t1.calc_id
, t1.connected_service, t1.parent_service, t.calc_name
, t.calc_formula, t.calc_value_formula, t.calc_by_counter
, t1.def_norm 
From usl_services t1
 Left Join usl_calc_formula t on t1.calc_id = t.usl_calc_formula_id