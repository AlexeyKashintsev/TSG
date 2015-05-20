/**
 * 
 * @author Alexey
 * @name formSaldoHistory
 * @public
 */

function formSaldoHistory() {
    var self = this, model = self.model;
    
    self.setLcId = function(aFlatId) {
        model.params.parFlatID = aFlatId;
    };

    self.syncParams = function(aDate, anIsEditable, anAccount) {
        model.params.parAccountID = anAccount;
        model.requery();
        //model.params.parDateID = aDate;
        //model.params.parAccountID = anAccount;
    };


    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
        self.model.save();
    }//GEN-LAST:event_btnSaveActionPerformed
    paramSynchronizer.addListener(this);
}