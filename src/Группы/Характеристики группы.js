/**
 * 
 * @author Alexey
 * @name formGroupCharacteristics
 * 
 */

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    dsCalcMethod.insert(dsCalcMethod.md.calc_name, 'Новый метод расчета');
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    confirm('Удалить данный метод расчета стоимости?')&&dsCalcMethod.delete();
}//GEN-LAST:event_btnDelActionPerformed

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (model.modified()&&confirm('Сохранить изменения?')){
        model.save();
    }
    model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    model.save();
}//GEN-LAST:event_btnSaveActionPerformed
