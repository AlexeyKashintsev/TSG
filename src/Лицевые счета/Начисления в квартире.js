/**
 * 
 * @author Alexey
 * @name form_sums_per_flat
 * @public
 */

function form_sums_per_flat() {


var self = this;
self.parentForm = null;

function initModuleSums(){
    if (!modSums)
        modSums = new SaldoAndSumsModule();
}


    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
        self.model.save();
    }//GEN-LAST:event_btnSaveActionPerformed
}