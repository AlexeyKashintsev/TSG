/**
 * 
 * @author Алексей
 * @name fmTarifs
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

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    model.save();
}//GEN-LAST:event_btnSaveActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    setElShown();
    parGroupID = dsGroupsAndAll.GroupID;
    dsTarifsInGroup.group_id = parGroupID;
}//GEN-LAST:event_formWindowOpened

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
}//GEN-LAST:event_formWindowClosing

function modelComboOnSelect(aEditor) {//GEN-FIRST:event_modelComboOnSelect
    parGroupID = dsGroupsAndAll.GroupID;
}//GEN-LAST:event_modelComboOnSelect
