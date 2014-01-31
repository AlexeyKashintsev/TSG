/**
 * 
 * @author Alexey
 */
function report_Bill() {
    var self = this;
    //var dsvav, dsgshsh, dssjkx;
    /*@declare*/
    var dsLC_byid = this.model.dsLC_byid;
    
   // var model = this.model;
    /*@end*/
    
    self.Group = {};
    self.Flats = {};
    self.Flats.ar = [];
    /**
     * Report's before render event handler.
     * @param evt Event object.
     */
    
    
    function getBarcode(rawData) {
        var offset = 32;
        var highAscii = 18;
        var newCodeString = new Array(rawData.length + 3);
        newCodeString[0] = offset + highAscii + 104;
        var total = 104;
        for (var stringCounter = 0;
                stringCounter < rawData.length; stringCounter++) {
            var
                    character =
                    rawData.substr(stringCounter, 1);
            var ASCIIValue =
                    character.charCodeAt(0);
            var checkDigit = ((ASCIIValue - offset) *
                    (stringCounter + 1));
            total += checkDigit;
            newCodeString[stringCounter
                    + 1] = ASCIIValue;
        }
        var check = total % 103;
        var holder = 0;
        if (check
                + offset >= 127) {
            holder = check + offset + highAscii;
        } else {
            holder = check + offset;
        }
        newCodeString[newCodeString.length - 2] =
                holder;
        holder = 106 + offset + highAscii;
        newCodeString[newCodeString.length - 1] = holder;
        for (var rCounter = 0
                ; rCounter < newCodeString.length; rCounter++) {
            if (newCodeString[rCounter] == 32) {
                newCodeString[rCounter] = 128;
            }
        }
        return newCodeString;
    }




    function onBeforeRender(evt){//GEN-FIRST:event_onBeforeRender
        var i = 0;
        self.model.params.parFlatID = 139106197774139;
        self.model.params.parDateID = 138408451934673;
        self.model.params.parGroupID = 138925376591464;
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
        
        self.dsFlatByIDorByGroup.forEach(function(Flat){
            try{
                self.dsLC_byid.params.lc_id = Flat.lc_id;
                self.saldo_by_flat.params.flat_id = Flat.lc_id;
                self.sums_perFlatWithUslNames.params.flat_id = Flat.lc_id;
                self.chars_flat.params.flat_id = Flat.lc_id;
                self.counters_values_by_flat.flat_id = Flat.lc_id;

                self.dsLC_byid.requery();
                self.saldo_by_flat.requery();
                self.sums_perFlatWithUslNames.requery();
                self.chars_flat.requery();
                self.counters_values_by_flat.requery();

                self.model.dsLC_byid.cursor.lc_flatnumber

                Logger.severe(Flat.lc_id);

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
                self.sums_perFlatWithUslNames.forEach(function(summ){
                    sum[sum.length] = {
                        usl_name:       summ.usl_name,
                        rate:           summ.rate,
                        calc:           summ.calc,
                        benefit:        summ.benefit,
                        recalc:         summ.recalc,
                        full_calc:      summ.full_calc
                    };
                });


                var counters = [];
                self.counters_values_by_flat.forEach(function(flat_cout){
                    counters[counters.length] = {
                        usl_name:self.sums_perFlatWithUslNames.findById(flat_cout.services_id).usl_name,
                        end_val: flat_cout.end_val,
                        beg_val: flat_cout.beg_val,
                        cons_val: flat_cout.cons_val
                    };
                });

                var chr_str = '';
                self.chars_flat.forEach(function(flat_char){
                    chr_str += (chr_str===''?'':', ') + self.characteristics_types.findById(flat_char.lc_char_type).char_name
                            + ':' + flat_char.lc_char_val;
                });
                
                var dates = '';

                    date = self.all_dates.findById(self.model.params.parDateID).per_date;
                   // alert(date.toLocaleDateString());
                    var monthNames = [ "январь", "Февраль", "март", "апрель", "май", "июнь",
                           "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь" ];
                    dates = (monthNames[date.getMonth()]+" "+date.getFullYear());
                
                var shtrih = '';
                stroka = self.dsGroupAndBank.grp_number;
                for (i=0;i<4-self.dsLC_byid.lc_flatnumber.length;i++)
                stroka = stroka+"0";
                stroka = stroka+self.lc_flatnumber.lc_flatnumber; 
                cod = "1134";
                for (i=0;i<8-stroka.length;i++){
                    cod = cod+"0";
                }
                cod = cod+stroka;
                a=self.model.saldo_by_flat.cursor.sal_end*100;
                a.toString();
                for (i=0;i<10-a.length;i++){
                    bar = bar+"0";
                }
                bar = bar+cod;
                shtrih = getBarcode(bar);
                
                var days = '';
                self.all_dates.forEach(function(day){
                    day = self.all_dates.findById(self.saldo_by_flat.date_id).per_date;
                   // alert(date.toLocaleDateString());
                    var monthNames = [ "января", "Февраля", "марта", "апреля", "мая", "июня",
                           "июля", "августа", "сентября", "октября", "ноября", "декабря" ];
                    prev_date = new Date(day.getFullYear(),day.getMonth()+1,day.getDate());
                    prev_date.setDate(0);
                    days = (prev_date.getDate()+" "+monthNames[prev_date.getMonth()]+" "+prev_date.getFullYear());
                });


                var lc_data = { 
                    lc_id:          dsLC_byid.cursor.lc_id,
                    lc_regto:       dsLC_byid.cursor.lc_regto,
                    lc_flatnumber:  dsLC_byid.cursor.lc_flatnumber,
                    reg_count:      dsLC_byid.cursor.registered_count,
                    lc_num:         dsLC_byid.cursor.lc_num,
                    saldo:          lc_saldo,
                    chars_str:      chr_str,
                    sums:           sum,
                    counter:       counters,
                    date:           dates,
                    day:            days,
                    barcode:        shtrih
                };

               // lc_data.saldo.begin;
                self.Flats.ar.push(lc_data);
                i++;
            } catch (e) {
                Logger.warning(e);
            };
        });
        self.Flats.len = self.dsFlatByIDorByGroup.length;
        self.Flats.i = i;
    }//GEN-LAST:event_onBeforeRender

}
