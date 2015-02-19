/**
 * 
 * @author TSG
 * @name debt_in_group
 * @public
 */
function debt_in_group() {
    var self = this, model = this.model, form = this;
    
    /*model.qFlatWithDebtInGroup.filter(function(row){
        if (row.sal_end > 10000)
            return model.qFlatWithDebtInGroup;
        });*/
    
self.syncParams = function(aDate, anIsEditable, anAccount) {
     model.params.parDateID = aDate;    
    //model.params.parDateID = aDate;
    //model.params.parAccountID = anAccount;
};
        
    function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
     model.params.parDebt = 0;
     self.modelSpin.value = model.params.parDebt;
     model.params.show_all_options = true;
    }//GEN-LAST:event_formWindowOpened
paramSynchronizer.addListener(this);
}
