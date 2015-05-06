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
    self.prevDate = function(aDateID) {
        self.all_dates.scrollTo(self.all_dates.findById(aDateID));
        self.all_dates.prev();
        return self.all_dates.per_date_id;
    };

    self.getLastDate = function() {
        self.model.all_dates.last();
        return self.model.all_dates.cursor.per_date_id;
    };

    self.getPayPeriod4Date = function(aDateID) {
        var curDate = self.all_dates.findById(aDateID).per_pay_day;
        var prevDate = self.all_dates.findById(self.prevDate(aDateID)).per_pay_day;
        return {
            start: prevDate,
            end: curDate
        };
    };

    self.newDate = function(aCallBack) {

        serverProgress.setMax(model.dsGroups.length * 4 + 1);
        serverProgress.setValue(0);
        serverProgress.setDescription("Подождите. Производится перенос данных в новый расчетный период");
        callBack = aCallBack;
        model.all_dates.last();
        var prevDate = model.all_dates.cursor.per_date_id;
        var lastDate = model.all_dates.per_date;
        model.all_dates.cursor.edit_date = false;
        model.all_dates.insert(self.all_dates.schema.per_date, lastDate.setMonth(lastDate.getMonth() + 1),
                self.all_dates.schema.edit_date, true);
        var newDate = model.all_dates.cursor.per_date_id;
        (function() {
            model.dsAllAccounts.requery(function() {
                model.dsAllAccounts.forEach(function(aAccount) {
                    model.save(function() {
                        serverProgress.increaseValue();
                        model.dsGroups.forEach(function(cursor) {
                            var group = cursor.grp_groups_id;
                            model.sums_4create.params.dateid = newDate;
                            model.sums_4create.params.groupid = group;
                            model.sums_4create.executeUpdate();
                            serverProgress.increaseValue();
                            grpModules[group] = new NewMonthInitializer4Group(prevDate, newDate, group, self, aAccount.grp_account_id);
                        });


                        var group = model.dsGroups.grp_groups_id;
                        //      model.sums_4create.params.dateid = newDate;
                        //       model.sums_4create.params.groupid = group;
                        //       model.sums_4create.executeUpdate();
                        serverProgress.increaseValue();
                        grpModules[group] = new NewMonthInitializer4Lc(prevDate, newDate, self, progress, aAccount.grp_account_id);
                    });
                });
            });
                serverProgress.finish();
        }).invokeBackground();
        self.model.params.prevDate = prevDate;
        self.model.params.newDate = newDate;
        //model.new_counter.execute();
        //model.new_saldo.execute();
        //model.new_tarif.execute();
    };

    self.ready = function() {
        grpProcessed++;
        if (grpProcessed === model.dsGroups.length) {
            grpModules = [];
            callBack();
        }
    };

}