/**
 * 
 * @name billsCounterValuesForGroup
 * @author TSG
 */
function billsCounterValuesForGroup() {
    var self = this, model = this.model;
    self.flats = [];
    /**
     * Report's before render event handler.
     * @param evt Event object.
     */
    self.setParams = function(aDate, aGroup, aAccount, aService){
        model.params.parDate = aDate;
        model.params.parGroup = aGroup;
        model.params.parAccount = aAccount;
        model.params.parService = aService;
    };
    
    function onBeforeRender(evt){//GEN-FIRST:event_onBeforeRender
        self.values = [];        
        model.flats_by_group.forEach(function(aRow){
            model.counters_values_by_flat.params.flat_id = aRow.lc_flat_id;
            model.counters_values_by_flat.requery();
            model.counters_values_by_flat.forEach(function(aValue){
                self.values.push({
                    usl_name:   model.qServices.findById(aValue.services_id).usl_name,
                    beg_value:  aValue.beg_val,
                    end_value:  aValue.end_val,
                    cons_value: aValue.cons_val,
                    count_name: aValue.counter_name                    
                });                
            });
            self.flats.push({
                flat_number:    aRow.lc_flatnumber,
                flat_regto:     aRow.lc_regto,
                count_values:   self.values
            });
            self.values = [];
        });
    }//GEN-LAST:event_onBeforeRender
    
}
