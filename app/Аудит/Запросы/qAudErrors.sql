/**
 *
 * @author Алексей
 * @name qAudErrors
 */ 
Select null as er_type, null as lc_id, null as service_id, null as date_id
, null as value_name, null as saved_value, null as calculated_value
From grp_bank t1
where t1.grp_bank_id is null