/**
 * 
 * @name BillsBuilder_Interstroy
 * @author Alexey
 */
function BillsBuilder_Interstroy() {
    var self = this, model = self.model;
    var dsLC_byid = this.model.dsLC_byid;

    
    self.Group = {};
    self.Flats = {};
    /**
     * Report's before render event handler.
     * @param evt Event object.
     */
    
    
    function strConcat(aBegStr, aEndStr, aResStrLength, aSymbol){
        var str_res = aBegStr.toString();
        for (i=0; i < aResStrLength - aEndStr.toString().length - aBegStr.toString().length; i++)
            str_res += aSymbol?aSymbol:'0';
        return str_res + aEndStr.toString();
    }
    
    
    function onBeforeRender(evt){//GEN-FIRST:event_onBeforeRender
        Logger.severe('Collecting data for report');
        var i = 0;
        self.Flats.ar = [];
       // self.model.params.parFlatID = 139187007155620;
       // self.model.params.parDateID = 138408451934673;
       // self.model.params.parGroupID = 139135094067101;self.dsFlatByIDorByGroup.requery()
        self.dsGroupAndBank.params.groupID = self.dsFlatByIDorByGroup.cursor.group_id;
        self.dsGroupAndBank.params.accountID = model.params.parAccountID;
        self.dsGroupAndBank.requery();

        self.Group = {
                grp_name: self.dsGroupAndBank.grp_name,
                grp_address: self.dsGroupAndBank.grp_address,
                grp_fname: self.dsGroupAndBank.grp_fname,
                grp_short_name: self.dsGroupAndBank.grp_short_name,
                bank_name: self.dsGroupAndBank.bank_name,
                bank_account: self.dsGroupAndBank.bank_account,
                bank_bik: self.dsGroupAndBank.bank_bik,
                bank_correction: self.dsGroupAndBank.bank_correction,
                group_inn:  self.dsGroupAndBank.group_inn,
                group_kpp:  self.dsGroupAndBank.group_kpp,
                percent: self.dsGroupAndBank.percent
        };
        var flats = [];
        var fc = 0;
        self.dsFlatByIDorByGroup.forEach(function(Flat){
            if (!flats[Flat.lc_id]&&(fc<50)){
                flats[Flat.lc_id] = true;
                fc++;
                try{
                    self.dsLC_byid.params.lc_id = Flat.lc_id;
                    self.saldo_by_flat.params.flat_id = Flat.lc_id;
                    self.sums_perFlatWithUslNames.params.flat_id = Flat.lc_id;
                    self.chars_flat.params.flat_id = Flat.lc_id;
                    self.counters_values_by_flat.params.flat_id = Flat.lc_id;


                    self.dsLC_byid.requery();
                    self.saldo_by_flat.requery();
                    self.sums_perFlatWithUslNames.requery();
                    self.chars_flat.requery();
                    self.counters_values_by_flat.requery();

                    //self.model.dsLC_byid.cursor.lc_flatnumber;
                    Logger.info(Flat.lc_id);

                    var lc_saldo = {
                        begin:      model.saldo_by_flat.cursor.sal_begin, 
                        end:        model.saldo_by_flat.cursor.sal_end,  
                        calc:       model.saldo_by_flat.cursor.sal_calc,
                        benefit:    model.saldo_by_flat.cursor.sal_benefit,  
                        payments:   model.saldo_by_flat.cursor.sal_payments,  
                        recalc:     model.saldo_by_flat.cursor.sal_recalc,  
                        full_calc:  model.saldo_by_flat.cursor.sal_full_calc, 
                        penalties_cur: model.saldo_by_flat.cursor.sal_penalties_cur, 
                        penalties_old: model.saldo_by_flat.cursor.sal_penalties_old,
                        sal_penalties_pay: model.saldo_by_flat.cursor.sal_penalties_pay
                    };
                    
                    if (self.dsGroupAndBank.percent !== 0){
                        var raschet = model.saldo_by_flat.cursor.sal_end*100/(100-self.dsGroupAndBank.percent)- model.saldo_by_flat.cursor.sal_end;
                        raschet = raschet.toFixed(2);
                        var percent = '(C учетом '+self.dsGroupAndBank.percent+'%банка = '+ raschet +'руб.)';            
                    }
                    else 
                        var raschet = 0;
                    
                    lc_saldo.debt = lc_saldo.begin - lc_saldo.payments + lc_saldo.sal_penalties_pay;
                    if(lc_saldo.end + lc_saldo.penalties_cur > 0){
                        lc_saldo.full_end = lc_saldo.end + lc_saldo.penalties_cur + parseFloat(raschet);
                    }
                    else lc_saldo.full_end = 0;

                    var sum = [];
                    var cnt = 0;
                    self.sums_perFlatWithUslNames.forEach(function(summ){
                        cnt++;
                        sum[sum.length] = {
                            usl_name:       summ.usl_name,
                            rate:           summ.rate,
                            calc:           summ.calc,
                            benefit:        summ.benefit,
                            recalc:         summ.recalc,
                            full_calc:      summ.full_calc,
                            count:          cnt
                        };
                    });

                    var counters = [];
                    var askCounters = [];
                    self.counters_values_by_flat.forEach(function(flat_cout){
                        counters[counters.length] = {
                            usl_name:self.allServices.findById(flat_cout.services_id).usl_name,
                            end_val: flat_cout.end_val,
                            beg_val: flat_cout.beg_val,
                            cons_val: flat_cout.cons_val
                        };
                        if (flat_cout.askinbills)
                            askCounters.push(self.allServices.findById(flat_cout.services_id).usl_name + '______');
                    });
                    
                    askCounters = askCounters.toString(',');

                    var chr_str = '';
                    self.chars_flat.forEach(function(flat_char){
                        if (flat_char.lc_char_val)
                            chr_str += (chr_str===''?'':', ') + self.characteristics_types.findById(flat_char.lc_char_type).char_name
                                    + ':' + flat_char.lc_char_val;
                    });

                    var dates = '';
                    var date = self.all_dates.findById(self.model.params.parDateID).per_date;
                    var monthNames = [ "январь", "Февраль", "март", "апрель", "май", "июнь",
                           "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь" ];
                    var monthNamesRP = [ "января", "Февраля", "марта", "апреля", "мая", "июня",
                           "июля", "августа", "сентября", "октября", "ноября", "декабря" ];
                    dates = (monthNames[date.getMonth()]+" "+date.getFullYear());

                    var saltoStr = (Math.round(lc_saldo.full_end*100)).toString();
                    var lc_num = strConcat(self.dsGroupAndBank.grpid, self.dsLC_byid.lc_num, 5);
                    var barCodeStr = strConcat('1134', lc_num, 12);
                    barCodeStr = strConcat(barCodeStr, saltoStr, 22);
                    
                    try {
                        var bcg = new Packages.barCodeGenerator.Code128;
                        var bcn = barCodeStr;
                        barCodeStr = bcg.codeIt(barCodeStr);
                    } catch(e) {
                        barCodeStr = 'No package!';
                    }
                    var DM = new DateModule();
                    var prevDate = self.model.all_dates.findById(DM.prevDate(self.model.params.parDateID)).per_pay_day;
                    var days = (prevDate.getDate() + " " + monthNamesRP[prevDate.getMonth()] + " " + prevDate.getFullYear());
                    var payDay = self.all_dates.findById(self.model.params.parDateID).per_pay_day;
                    payDay = (payDay.getDate() + " " + monthNamesRP[payDay.getMonth()] + " " + payDay.getFullYear());
                    
                   /* self.all_dates.forEach(function(day){
                        day = self.all_dates.findById(self.saldo_by_flat.date_id).per_date;
                        var prev_date = new Date(day.getFullYear(),day.getMonth()+1,day.getDate());
                        prev_date.setDate(0);
                        days = (prev_date.getDate()+" "+monthNames[prev_date.getMonth()]+" "+prev_date.getFullYear());
                    });*/


                    var lc_data = { 
                        lc_id:          dsLC_byid.cursor.lc_id,
                        lc_regto:       dsLC_byid.cursor.lc_regto,
                        lc_flatnumber:  dsLC_byid.cursor.lc_flatnumber,
                        reg_count:      dsLC_byid.cursor.registered_count,
                        lc_num:         lc_num,
                        saldo:          lc_saldo,
                        chars_str:      chr_str,
                        sums:           sum,
                        counter:        counters,
                        date:           dates,
                        day:            days,
                        payDay:         payDay,
                        barcode:        barCodeStr,
                        bk:             bcn,
                        counters4ask:   askCounters,
                        percent:        percent
                    };

                   // lc_data.saldo.begin;
                    self.Flats.ar.push(lc_data);
                    i++;
                } catch (e) {
                    Logger.warning(e);
                };
            }
        });
        self.Flats.len = self.dsFlatByIDorByGroup.length;
        self.Flats.i = i;
        Logger.severe('Building report');
    }//GEN-LAST:event_onBeforeRender
    
    // TODO : place your code here
}
