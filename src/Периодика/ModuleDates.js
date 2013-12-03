/**

 * @public
 * @author Андрей
 * @name ModuleTarifs
 * 
 */



/*
 * Вывод предыдущей даты
 * @param {type} parDateID
 * @returns {@exp;per_date}
 * TODO Доделать добавление,запутался куда добавлять;
 */
function prevDate(aDateID){  
    all_dates.per_date_id = parDateID;      
    prevDateID = all_dates.per_date_id.prev;
}