/**
 * 
 * @author Alexey
 * @name form_sums_per_flat
 * @public
 */

function form_sums_per_flat() {


var self = this, model = self.model;
self.parentForm = null;

function initModuleSums(){
    if (!modSums)
        modSums = new SaldoAndSumsModule();
}

self.syncParams = function(aDate, anIsEditable, anAccount) {
    self.modelGrid.editable = anIsEditable;
    model.params.parDateID = aDate;
    model.params.parAccountID = anAccount;
    //model.params.parDateID = aDate;
    //model.params.parAccountID = anAccount;
};

    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
        self.model.save();
    }//GEN-LAST:event_btnSaveActionPerformed

    function btnRequeryActionPerformed(evt) {//GEN-FIRST:event_btnRequeryActionPerformed
        self.model.requery();
    }//GEN-LAST:event_btnRequeryActionPerformed
    paramSynchronizer.addListener(this);
}