/**
 * 
 * @author Алексей
 * @name template
 * @public
 */

var isSelectForm = true;
var isEditable = false;
var canSetEdit = true;

function setEdit(){
    modelGrid.editable = btnAdd.enabled = 
            btnDel.enabled = btnSave.enabled = isEditable;    
    btnAddParent.enabled = isEditable;
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

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
}//GEN-LAST:event_formWindowClosing
