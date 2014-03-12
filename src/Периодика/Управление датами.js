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

self.newDate = function(aCallBack) {
    callBack = aCallBack;
    model.all_dates.last();
    var prevDate = model.all_dates.cursor.per_date_id;
    var lastDate = model.all_dates.per_date;
    self.all_dates.insert(self.all_dates.md.per_date, lastDate.setMonth(lastDate.getMonth()+1));
    var newDate = model.all_dates.cursor.per_date_id;
    model.save(function(){
        model.dsGroups.beforeFirst();
        while (model.dsGroups.next()) {
            var group = model.dsGroups.grp_groups_id;
            model.sums_4create.params.dateid = newDate;
            model.sums_4create.params.groupid = group;
            model.sums_4create.executeUpdate();
            grpModules[group] = new NewMonthInitializer4Group(prevDate, newDate, group, self);
        }        
    });

};

self.ready = function() {
    grpProcessed++;
    if (grpProcessed === model.dsGroups.length) {
        grpModules = [];
        callBack();
    }
};

}