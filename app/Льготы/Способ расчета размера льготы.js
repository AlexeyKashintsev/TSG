/**
 * 
 * @author Алексей
 * @name fmBenefitCalcType
 * @public
 */

function fmBenefitCalcType() {


var self = this;


var isSelectForm = false;
var isEditable = true;
var canSetEdit = false;

function setEdit(){
    self.modelGrid.editable = self.btnAdd.enabled = 
            self.btnDel.enabled = self.btnSave.enabled = isEditable;    
    self.tbSetEdit.visible = canSetEdit;
    self.tbSetEdit.selected = isEditable;
}

function setElShown(){
    setEdit();
    if (!isSelectForm){
        self.pnlSelLock.visible = false;
        self.pnlWorkSpace.height += 48;
        self.modelGrid.bottom += 48;
    }
}

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    self.dsCalcMethod.insert(self.dsCalcMethod.schema.calc_name, 'Новый метод расчета');
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    confirm('Удалить данный метод расчета стоимости?')&&self.dsCalcMethod.delete();
}//GEN-LAST:event_btnDelActionPerformed

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (self.model.modified()&&confirm('Сохранить изменения?')){
        self.model.save();
    }
    self.model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    self.model.save();
}//GEN-LAST:event_btnSaveActionPerformed

function btnSelectActionPerformed(evt) {//GEN-FIRST:event_btnSelectActionPerformed
    self.close(self.dsCalcMethod.usl_calc_formula_id);
}//GEN-LAST:event_btnSelectActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    setElShown();
}//GEN-LAST:event_formWindowOpened

function tbSetEditActionPerformed(evt) {//GEN-FIRST:event_tbSetEditActionPerformed
    isEditable = self.tbSetEdit.selected;
    setEdit();
}//GEN-LAST:event_tbSetEditActionPerformed

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
}//GEN-LAST:event_formWindowClosing

}