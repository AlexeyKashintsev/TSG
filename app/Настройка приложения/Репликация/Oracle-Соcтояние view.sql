/**
 * @name 135782364471867
 * @public
 * @rolesAllowed admin
 */
SELECT 
  tablename as viewname,
  usr_name,
  '' as schemaname,
  '' as statusview 
FROM replicate_views v,mtd_users u
where 1=0