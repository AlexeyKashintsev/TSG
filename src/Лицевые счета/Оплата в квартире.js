/**
 * 
 * @author Alexey
 * @name formPaymentsInFlat
 */

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (model.modified&&confirm('Сохранить изменения?')){
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

function textFieldActionPerformed(evt) {//GEN-FIRST:event_textFieldActionPerformed
        textField.text = parDateID ;	// TODO Добавьте свой код:
}//GEN-LAST:event_textFieldActionPerformed
