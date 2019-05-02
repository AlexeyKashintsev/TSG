/**
 * 
 * @name PeniByPeriodReport
 * @author Алексей
 */
function PeniByPeriodReport() {
    var self = this, model = this.model;
    
    var lcid, account, start, end;
    
    self.setParams = function(aLcId, anAccountId, aStartDate, anEndDate) {
        lcid = aLcId;
        account = anAccountId;
        start = aStartDate;
        end = anEndDate;
    };
    /**
     * Report's before render event handler.
     * @param evt Event object.
     */
    function onBeforeRender(evt){//GEN-FIRST:event_onBeforeRender
        model.qPeniRecordsByFlatByPeriod.params.account = account;
        model.qPeniRecordsByFlatByPeriod.params.flat = lcid;
        model.qPeniRecordsByFlatByPeriod.params.date_start = start;
        model.qPeniRecordsByFlatByPeriod.params.date_end = end;
        
        model.all_dates.params.date_start = start;
        model.all_dates.params.date_end = end;
        
        model.saldo_by_flat.params.account_id = account;
        model.saldo_by_flat.params.flat_id = lcid;
        model.saldo_by_flat.params.date_start = start;
        model.saldo_by_flat.params.date_end = end;
        
        model.lc_by_ID.params.lc_id = lcid;
        
        model.requery(function() {
            self.lc = {
                lc_regto: model.lc_by_ID.cursor.lc_regto,
                lc_num: model.lc_by_ID.cursor.lc_num,
                lc_flatnumber: model.lc_by_ID.cursor.lc_flatnumber
            };
            self.periods = [];
            model.saldo_by_flat.beforeFirst();
            while(model.saldo_by_flat.next()) {
                var p = {
                    sal_begin: model.saldo_by_flat.cursor.sal_begin,
                    sal_calc: model.saldo_by_flat.cursor.sal_calc,
                    sal_payments: model.saldo_by_flat.cursor.sal_payments,
                    sal_end: model.saldo_by_flat.cursor.sal_end,
                    sal_penalties_old: model.saldo_by_flat.cursor.sal_penalties_old,
                    sal_penalties_calc: model.saldo_by_flat.cursor.sal_penalties_calc,
                    sal_penalties_pay: model.saldo_by_flat.cursor.sal_penalties_pay,
                    sal_penalties_cur: model.saldo_by_flat.cursor.sal_penalties_cur,
                    text_date: model.all_dates.cursor.TextDate
                };
                model.qPeniRecordsByFlatByPeriod.beforeFirst();
                p.details = [];
                while(model.qPeniRecordsByFlatByPeriod.next()) {
                    var od = model.qPeniRecordsByFlatByPeriod.cursor.op_date;
                    var dd = model.qPeniRecordsByFlatByPeriod.cursor.debt_date;
                    var d = {
                        op_date         :  od.toLocaleDateString('ru-RU', {year: 'numeric', month: 'string'}),
                        debt_date       :  dd.toLocaleDateString('ru-RU', {year: 'numeric', month: 'string'}),//dd.getDay() + '-' + dd.getMonth() + '-' + dd.getFullYear(),
                        debt_sum        :  model.qPeniRecordsByFlatByPeriod.cursor.debt_sum     ,
                        debt_remain     :  model.qPeniRecordsByFlatByPeriod.cursor.debt_remain  ,
                        debt_age_days   :  model.qPeniRecordsByFlatByPeriod.cursor.debt_age_days,
                        debt_paid       :  model.qPeniRecordsByFlatByPeriod.cursor.debt_paid    ,
                        peni_days       :  model.qPeniRecordsByFlatByPeriod.cursor.peni_days    ,
                        peni_calc       :  model.qPeniRecordsByFlatByPeriod.cursor.peni_calculated,
                        peni_rate       :  model.qPeniRecordsByFlatByPeriod.cursor.peni_rate
                    };
                    p.details.push(d);
                }
                self.periods.push(p);
            }
        });
    }//GEN-LAST:event_onBeforeRender
    
}
