/* 
 * @public 
 * @author Андрей
 * @name dsServicesIsAbsent
 */
SELECT services
FROM usl_services m
WHERE NOT EXISTS (SELECT usl_services_id
                                        FROM usl_tarif d
                                        WHERE d.services_id = m.usl_services_id)

