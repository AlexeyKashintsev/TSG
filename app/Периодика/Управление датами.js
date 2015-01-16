/**
 * @public
 * @author Андрей
 * @name DateModule
 */

function DateModule() {


var self = this, model = self.model;
var grpProcessed = 0;
var grpModules = [];
var callBack = null;

processedCounters = [];

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

self.getLastDate = function() {
    self.model.all_dates.last();
    return self.model.all_dates.cursor.per_date_id;
};

self.getPayPeriod4Date = function(aDateID){
    var curDate = self.all_dates.findById(aDateID).per_pay_day;
    var prevDate = self.all_dates.findById(self.prevDate(aDateID)).per_pay_day;
    return {
        start   : prevDate,
        end     : curDate
    };
};

self.newDate = function(aCallBack) {
    var progress = new ProgressShow();
    progress.setMax(model.dsGroups.length * 4 + 1);
    progress.setDescription("Подождите. Производится перенос данных в новый расчетный период");
    callBack = aCallBack;
    model.all_dates.last();
    var prevDate = model.all_dates.cursor.per_date_id;
    var lastDate = model.all_dates.per_date;
    self.all_dates.insert(self.all_dates.schema.per_date, lastDate.setMonth(lastDate.getMonth()+1));
    var newDate = model.all_dates.cursor.per_date_id;
    (function(){
        model.save(function(){
            (function(){progress.increaseValue(1);}).invokeAndWait();
           
            model.dsGroups.beforeFirst();
            while (model.dsGroups.next()) {
                var group = model.dsGroups.grp_groups_id;
                model.sums_4create.params.dateid = newDate;
                model.sums_4create.params.groupid = group;
                model.sums_4create.executeUpdate();
                (function(){progress.increaseValue(1);}).invokeAndWait();
                grpModules[group] = new NewMonthInitializer4Group(prevDate, newDate, group, self, progress);
            }
            
            model.dsAllLc.beforeFirst();
            while (model.dsAllLc.next()) {
                var lc = model.dsAllLc.lc_flat_id;
          //      model.sums_4create.params.dateid = newDate;
         //       model.sums_4create.params.groupid = group;
         //       model.sums_4create.executeUpdate();
               (function(){progress.increaseValue(1);}).invokeAndWait();
                grpModules[lc] = new NewMonthInitializer4Lc(prevDate, newDate, lc, self, progress);
            }
            (function(){progress.close();}).invokeAndWait();
        });
    }).invokeBackground();
    progress.showModal();
};

self.ready = function() {
    grpProcessed++;
    if (grpProcessed === model.dsGroups.length) {
        grpModules = [];
        callBack();
    }
};

}