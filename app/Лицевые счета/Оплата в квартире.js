/**
 * 
 * @author Alexey
 * @name formPaymentsInFlat
 * @public
 */

function formPaymentsInFlat() {
    var self = this, model = self.model;

    self.setLcId = function(aFlatId) {
        model.params.parFlatID = aFlatId;
    };
    
function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
        if (model.modified && confirm('Сохранить изменения?')) {
            model.save();
        }
        model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
        model.save();
}//GEN-LAST:event_btnSaveActionPerformed

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
	// TODO Добавьте свой код:
}//GEN-LAST:event_btnAddActionPerformed
    paramSynchronizer.addListener(this);
}