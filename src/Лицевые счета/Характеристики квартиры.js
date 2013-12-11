/**
 * 
 * @author Alexey
 * @name charsFlat
 * @public
 */

function charsFlat() {


var self = this;


function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (self.model.modified()&&confirm('Сохранить изменения?')){
        self.model.save();
    }
    self.model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    self.model.save();
}//GEN-LAST:event_btnSaveActionPerformed

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    dsCalcMethod.insert(dsCalcMethod.md.calc_name, 'Новый метод расчета');
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    confirm('Удалить данный метод расчета стоимости?')&&dsCalcMethod.delete();
}//GEN-LAST:event_btnDelActionPerformed

function btnAdd1ActionPerformed(evt) {//GEN-FIRST:event_btnAdd1ActionPerformed
	// TODO Добавьте свой код:
}//GEN-LAST:event_btnAdd1ActionPerformed

function btnDel1ActionPerformed(evt) {//GEN-FIRST:event_btnDel1ActionPerformed
	// TODO Добавьте свой код:
}//GEN-LAST:event_btnDel1ActionPerformed

}