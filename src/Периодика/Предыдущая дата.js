/**
 * @public
 * @author Андрей
 * @name DateModule
 */

/*
 * Вывод предыдущей даты
 * @param {type} parDateID
 * @returns {@exp;per_date}
 * TODO Доделать добавление,запутался куда добавлять;
 */
function prevDate(aDateID){  
    all_dates.scrollTo(all_dates.findById(aDateID));
    all_dates.prev();
    return all_dates.per_date_id;
}
