/**
 *
 * @author Алексей
 * @name qServices
 * @public
 * @writable usl_services
 */ 
Select * 
From usl_services t1
 Inner Join usl_calc_formula t on t1.calc_id = t.usl_calc_formula_id