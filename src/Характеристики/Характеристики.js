/**
 * 
 * @author Алексей
 * @name characteristics_type
 * @public
 */

var isSelectForm = true;
var isEditable = true;
var canSetEdit = false;

function setEdit(){
    modelGrid.editable = btnAdd.enabled = 
            btnDel.enabled = btnSave.enabled = isEditable;    
    tbSetEdit.visible = canSetEdit;
    tbSetEdit.selected = isEditable;
}

function setElShown(){
    setEdit();
    if (!isSelectForm){
        pnlSelLock.visible = false;
        pnlWorkSpace.height += 48;
        modelGrid.bottom += 48;
    }
}

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
    model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    model.save();
}//GEN-LAST:event_btnSaveActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    setElShown();
}//GEN-LAST:event_formWindowOpened

function tbSetEditActionPerformed(evt) {//GEN-FIRST:event_tbSetEditActionPerformed
    isEditable = tbSetEdit.selected;
    setEdit();
}//GEN-LAST:event_tbSetEditActionPerformed

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    characteristics_types_1.insert();
    
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    characteristics_types_1.delete();
}//GEN-LAST:event_btnDelActionPerformed

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
}//GEN-LAST:event_formWindowClosing

function btnSelectActionPerformed(evt) {//GEN-FIRST:event_btnSelectActionPerformed
        close(characteristics_types_1.char_types_id);
}//GEN-LAST:event_btnSelectActionPerformed
