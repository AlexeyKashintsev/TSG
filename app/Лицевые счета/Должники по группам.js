/**
 * 
 * @author TSG
 * @name debt_in_group
 * @public
 */
function debt_in_group() {
    var self = this, model = this.model, form = this;
    
    /*model.debt_by_group.filter(function(row){
        if (row.sal_end > 10000)
            return model.debt_by_group;
        });*/
    
    self.setDate = function(aNewDate){
        model.params.parDateID = aNewDate;
    }

    function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
     model.params.parDebt = 0;
     self.modelSpin.value = model.params.parDebt;
    }//GEN-LAST:event_formWindowOpened
}
