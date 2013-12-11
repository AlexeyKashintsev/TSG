/**
 * @public
 * @author Андрей
 * @name DateModule
 */

function DateModule() {


var self = this;


/*
 * Вывод предыдущей даты
 * @param {type} parDateID
 * @returns {@exp;per_date}
 * TODO Доделать добавление,запутался куда добавлять;
 */
self.prevDate = function(aDateID){  
    self.all_dates.scrollTo(self.all_dates.findById(aDateID));
    self.all_dates.prev();
    return self.all_dates.per_date_id;
};

}