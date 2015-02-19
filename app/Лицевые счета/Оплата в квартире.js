/**
 * 
 * @author Alexey
 * @name formPaymentsInFlat
 * @public
 */

function formPaymentsInFlat() {


var self = this;


function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
    self.model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    self.model.save();
}//GEN-LAST:event_btnSaveActionPerformed

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
	// TODO Добавьте свой код:
}//GEN-LAST:event_btnAddActionPerformed
paramSynchronizer.addListener(this);
}