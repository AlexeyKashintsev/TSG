/**
 * 
 * @name BillsBuilder_Doverie
 * @author Alexey
 */
function BillsBuilder_Nadezhda_kapRemont() {
    var self = this, model = self.model;
    var dsLC_byid = this.model.dsLC_byid;
 
    var flatsArr = [];
    self.Group = {};
    self.Flats = {};
    /**
     * Report's before render event handler.
     * @param evt Event object.
     */
    self.all_flats = true;
    
    function strConcat(aBegStr, aEndStr, aResStrLength, aSymbol){
        var str_res = aBegStr.toString();
        for (i=0; i < aResStrLength - aEndStr.toString().length - aBegStr.toString().length; i++)
            str_res += aSymbol?aSymbol:'0';
        return str_res + aEndStr.toString();
    }
    

    self.flatToRender = function(aFlats){
        flatsArr = aFlats;
    };
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
                grp_name:       self.dsGroupAndBank.grp_name,
                grp_address:    self.dsGroupAndBank.grp_address,
                grp_fname:      self.dsGroupAndBank.grp_fname,
                grp_short_name: self.dsGroupAndBank.grp_short_name,
                bank_name:      self.dsGroupAndBank.bank_name,
                bank_account:   self.dsGroupAndBank.bank_account,
                bank_bik:       self.dsGroupAndBank.bank_bik,
                bank_correction: self.dsGroupAndBank.bank_correction,
                group_inn:      self.dsGroupAndBank.group_inn,
                group_kpp:      self.dsGroupAndBank.group_kpp,
                percent:        self.dsGroupAndBank.percent
        };
        var maxCountServices = 0;
        flatsArr.forEach(function(flat){
            model.sums_perFlatWithUslNames.params.flat_id = flat.lc_id;
            model.sums_perFlatWithUslNames.requery();
            if(model.sums_perFlatWithUslNames.length > maxCountServices)
                maxCountServices = model.sums_perFlatWithUslNames.length;
        });
        var flats = [];
        var fc = 0;
        for(var j = 0; j < 2; j++){
            if ((fc<50)){
                fc++;
                try{
                    
                    self.dsLC_byid.params.lc_id = flatsArr[j] ? flatsArr[j].lc_id : null;
                    self.saldo_by_flat.params.flat_id = flatsArr[j]? flatsArr[j].lc_id : null;
                    self.sums_perFlatWithUslNames.params.flat_id = flatsArr[j] ? flatsArr[j].lc_id : null;
                    self.chars_flat.params.flat_id = flatsArr[j] ? flatsArr[j].lc_id : null;
                    self.counters_values_by_flat.params.flat_id = flatsArr[j] ? flatsArr[j].lc_id : null;
                    

                    self.dsLC_byid.requery();
                    self.saldo_by_flat.requery();
                    self.sums_perFlatWithUslNames.requery();
                    self.chars_flat.requery();
                    self.counters_values_by_flat.requery();

                    var lc_saldo = {
                        begin:      flatsArr[j] ? model.saldo_by_flat.cursor.sal_begin : '', 
                        end:        flatsArr[j] ? model.saldo_by_flat.cursor.sal_end : '',  
                        calc:       flatsArr[j] ? model.saldo_by_flat.cursor.sal_calc: '',
                        benefit:    flatsArr[j] ? model.saldo_by_flat.cursor.sal_benefit : '',  
                        payments:   flatsArr[j] ? model.saldo_by_flat.cursor.sal_payments : '',  
                        recalc:     flatsArr[j] ? model.saldo_by_flat.cursor.sal_recalc : '',  
                        full_calc:  flatsArr[j] ? model.saldo_by_flat.cursor.sal_full_calc : '', 
                        penalties_cur: flatsArr[j] ? model.saldo_by_flat.cursor.sal_penalties_cur : '', 
                        penalties_old: flatsArr[j] ? model.saldo_by_flat.cursor.sal_penalties_old : '',
                        sal_penalties_pay: flatsArr[j] ? model.saldo_by_flat.cursor.sal_penalties_pay : ''
                    };
                    
                    lc_saldo.debt = flatsArr[j] ? lc_saldo.end - lc_saldo.full_calc + lc_saldo.sal_penalties_pay: '';//lc_saldo.begin - lc_saldo.payments;
                    lc_saldo.full_end = flatsArr[j] ? lc_saldo.end + lc_saldo.penalties_cur : '';
                    
                    var percentCalc1 = lc_saldo.full_end*100/99;
                    var percentCalc1_5 = lc_saldo.full_end*100/98.5;
                    lc_saldo.full_1_5 = percentCalc1_5.toFixed(2);   
                    lc_saldo.full_1 = percentCalc1.toFixed(2); 

                    var sum = [];
                    var cnt = 0;
                    for (var i = 0; i < maxCountServices; i++){
                        cnt++;
                        sum[sum.length] = {
                            usl_name:       model.sums_perFlatWithUslNames[i] ? model.sums_perFlatWithUslNames[i].usl_name : '',
                            rate:           model.sums_perFlatWithUslNames[i] ? model.sums_perFlatWithUslNames[i].rate : '',
                            calc:           model.sums_perFlatWithUslNames[i] ? model.sums_perFlatWithUslNames[i].calc : '',
                            benefit:        model.sums_perFlatWithUslNames[i] ? model.sums_perFlatWithUslNames[i].benefit : '',
                            recalc:         model.sums_perFlatWithUslNames[i] ? model.sums_perFlatWithUslNames[i].recalc : '',
                            full_calc:      model.sums_perFlatWithUslNames[i] ? model.sums_perFlatWithUslNames[i].full_calc : '',
                            count:          cnt
                        };
                    };

                    var counters = [];
                    var askCounters = [];
                    var count = 0;
                    self.counters_values_by_flat.forEach(function(flat_cout){
                        count++;
                        counters[counters.length] = {
                            usl_name:self.allServices.findById(flat_cout.services_id).usl_name,
                            end_val: flat_cout.end_val,
                            beg_val: flat_cout.beg_val,
                            cons_val: flat_cout.cons_val,
                            count:  count
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

                    var dates = '', dateV = '';
                    var date = self.all_dates.findById(self.model.params.parDateID).per_date;
                    var monthNames = [ "январь", "Февраль", "март", "апрель", "май", "июнь",
                           "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь" ];
                    var monthNamesRP = [ "января", "Февраля", "марта", "апреля", "мая", "июня",
                           "июля", "августа", "сентября", "октября", "ноября", "декабря" ];
                    var monthNamesVP = [ "январе", "Феврале", "марте", "апреле", "мае", "июне",
                            "июле", "августе", "сентябре", "октябре", "ноябре", "декабре" ];
                    dates = (monthNames[date.getMonth()]+" "+date.getFullYear());
                    dateV = (monthNamesVP[date.getMonth()]+" "+date.getFullYear());

                    var saltoStr = (Math.round(lc_saldo.full_end*100)).toString();
                    var lc_num = 1;//strConcat(self.dsGroupAndBank.grpid, self.dsLC_byid.lc_num, 5);
                    var barCodeStr = 1;//strConcat('1134', lc_num, 12);
                    barCodeStr = 0;//strConcat(barCodeStr, saltoStr, 22);
                    
                    /*try {
                        var bcg = new Packages.barCodeGenerator.Code128;
                        var bcn = barCodeStr;
                        barCodeStr = bcg.codeIt(barCodeStr);
                    } catch(e) {
                        barCodeStr = 'No package!';
                    }*/
                    var DM = new DateModule();
                    var prevDate = self.model.all_dates.findById(DM.prevDate(self.model.params.parDateID)).per_pay_day;
                    var days = (prevDate.getDate() + " " + monthNamesRP[prevDate.getMonth()] + " " + prevDate.getFullYear());
                    var payDay = self.all_dates.findById(self.model.params.parDateID).per_pay_day;
                    var firstDay = ("01 " + monthNamesRP[prevDate.getMonth()] + " " + prevDate.getFullYear());
                    payDay = (payDay.getDate() + " " + monthNamesRP[payDay.getMonth()] + " " + payDay.getFullYear());

                    var lc_data = { 
                        lc_id:          flatsArr[j] ? dsLC_byid.cursor.lc_id : '',
                        lc_regto:       flatsArr[j] ? dsLC_byid.cursor.lc_regto : '',
                        lc_flatnumber:  flatsArr[j] ? dsLC_byid.cursor.lc_flatnumber : '',
                        reg_count:      flatsArr[j] ? dsLC_byid.cursor.registered_count : '',
                        lc_num:         lc_num,
                        saldo:          lc_saldo,
                        chars_str:      chr_str,
                        sums:           sum,
                        counter:        counters,
                        date:           dates,
                        dateV:          dateV,
                        day:            firstDay,
                        payDay:         payDay,
                        barcode:        barCodeStr,
                        bk:             barCodeStr,//bcn,
                        counters4ask:   askCounters
                    };

                   // lc_data.saldo.begin;
                    self.Flats.ar.push(lc_data);
                    i++;
                } catch (e) {
                    Logger.warning(e);
                };
            }
        };
        self.Flats.len = self.dsFlatByIDorByGroup.length;
        self.Flats.i = i;
        Logger.severe('Building report');
    }//GEN-LAST:event_onBeforeRender
    
    // TODO : place your code here
}
