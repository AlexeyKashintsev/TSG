/**
 * @name 135849752056204
 * @manual
 * @public
 * @rolesAllowed admin 
 
 */ 
Select replicate_generateSchemaName() AS schemaName 
From (Select COUNT(*) 
From DUMMYTABLE t1) t_generateSchemaName