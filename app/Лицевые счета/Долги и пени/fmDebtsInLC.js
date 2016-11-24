/**
 * 
 * @author Алексей
 */
function fmDebtsInLC() {
    var self = this, model = this.model, form = this;

    
    self.showDetails = function(aLcId, anAccountId) {
        model.qDebtsByLC.params.lcId = aLcId;
        model.qDebtsByLC.params.accountId = anAccountId;
        model.qDebtsByLC.params.show_all = true;
        model.qDebtsByLC.requery();
        self.showModal();
    };

    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
        model.save();
    }//GEN-LAST:event_btnSaveActionPerformed

    function btnRequeryActionPerformed(evt) {//GEN-FIRST:event_btnRequeryActionPerformed
        model.revert();
    }//GEN-LAST:event_btnRequeryActionPerformed
}
