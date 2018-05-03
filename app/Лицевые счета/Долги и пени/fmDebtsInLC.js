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
        self.show();
    };

    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
        model.save();
    }//GEN-LAST:event_btnSaveActionPerformed

    function btnRequeryActionPerformed(evt) {//GEN-FIRST:event_btnRequeryActionPerformed
        model.revert();
    }//GEN-LAST:event_btnRequeryActionPerformed

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        var plc = new fmPeniByPeriod();
        plc.setParams(model.qDebtsByLC.params.lcId , model.qDebtsByLC.params.accountId);
        plc.showModal();
    }//GEN-LAST:event_buttonActionPerformed
}
