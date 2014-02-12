/**
 * 
 * @author Alexey
 */
function report_Bill() {
    var self = this;
    var dsLC_byid = this.model.dsLC_byid;

    
    self.Group = {};
    self.Flats = {};
    self.Flats.ar = [];
    /**
     * Report's before render event handler.
     * @param evt Event object.
     */
    
    
    function strConcat(aBegStr, aEndStr, aResStrLength, aSymbol){
        var str_res = aBegStr;
        for (i=0; i < aResStrLength - aEndStr.length; i++)
            str_res += aSymbol?aSymbol:'0';
        return str_res + aEndStr;
    }

    function onBeforeRender(evt){//GEN-FIRST:event_onBeforeRender
        Logger.severe('Collecting data for report');
        var i = 0;
       // self.model.params.parFlatID = 139187007155620;
       // self.model.params.parDateID = 138408451934673;
       // self.model.params.parGroupID = 139135094067101;
        self.dsGroupAndBank.params.groupID = self.dsFlatByIDorByGroup.cursor.group_id;
        self.dsGroupAndBank.requery();
        self.Group = {
                grp_name: self.dsGroupAndBank.grp_name,
                grp_address: self.dsGroupAndBank.grp_address,
                grp_fname: self.dsGroupAndBank.grp_fname,
                grp_short_name: self.dsGroupAndBank.grp_short_name,
                bank_name: self.dsGroupAndBank.bank_name,
                bank_account: self.dsGroupAndBank.bank_account,
                bank_bik: self.dsGroupAndBank.bank_bik,
                bank_correction: self.dsGroupAndBank.bank_correction
        };
        var flats = [];
        var fc = 0;
        self.dsFlatByIDorByGroup.requery(function(){
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
                            begin:      self.model.saldo_by_flat.cursor.sal_begin, 
                            end:        self.model.saldo_by_flat.cursor.sal_end,  
                            calc:       self.model.saldo_by_flat.cursor.sal_calc,
                            benefit:    self.model.saldo_by_flat.cursor.sal_benefit,  
                            payments:   self.model.saldo_by_flat.cursor.sal_payments,  
                            recalc:     self.model.saldo_by_flat.cursor.sal_recalc,  
                            full_calc:  self.model.saldo_by_flat.cursor.sal_full_calc, 
                            penalties_cur: self.model.saldo_by_flat.cursor.sal_penalties_cur, 
                            penalties_old: self.model.saldo_by_flat.cursor.sal_penalties_old
                        };


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
                        self.counters_values_by_flat.forEach(function(flat_cout){
                            counters[counters.length] = {
                                usl_name:self.allServices.findById(flat_cout.services_id).usl_name,
                                end_val: flat_cout.end_val,
                                beg_val: flat_cout.beg_val,
                                cons_val: flat_cout.cons_val
                            };
                        });

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
                        dates = (monthNames[date.getMonth()]+" "+date.getFullYear());

                        var saltoStr = (self.model.saldo_by_flat.cursor.sal_end*100).toString();
                        var lc_num = strConcat(self.dsGroupAndBank.grp_number, self.dsLC_byid.lc_flatnumber, 4);
                        var barCodeStr = strConcat('1134', lc_num, 8);
                        barCodeStr = strConcat(barCodeStr, saltoStr, 10);

                        var bcg = new Packages.barCodeGenerator.Code128;
                        barCodeStr = bcg.codeIt(barCodeStr);

                        var days = '';
                        self.all_dates.forEach(function(day){
                            day = self.all_dates.findById(self.saldo_by_flat.date_id).per_date;
                           // alert(date.toLocaleDateString());
                          //  var monthNames = [ "января", "Февраля", "марта", "апреля", "мая", "июня",
                            //       "июля", "августа", "сентября", "октября", "ноября", "декабря" ];
                            var prev_date = new Date(day.getFullYear(),day.getMonth()+1,day.getDate());
                            prev_date.setDate(0);
                            days = (prev_date.getDate()+" "+monthNames[prev_date.getMonth()]+" "+prev_date.getFullYear());
                        });


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
                            barcode:        barCodeStr
                        };

                       // lc_data.saldo.begin;
                        self.Flats.ar.push(lc_data);
                        i++;
                    } catch (e) {
                        Logger.warning(e);
                    };
                }
            });
        });
        self.Flats.len = self.dsFlatByIDorByGroup.length;
        self.Flats.i = i;
        Logger.severe('Building report');
    }//GEN-LAST:event_onBeforeRender

}
