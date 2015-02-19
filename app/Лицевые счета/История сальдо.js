/**
 * 
 * @author Alexey
 * @name formSaldoHistory
 * @public
 */

function formSaldoHistory() {
var self = this;



    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
        self.model.save();
    }//GEN-LAST:event_btnSaveActionPerformed
paramSynchronizer.addListener(this);
}