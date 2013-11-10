/**
 * 
 * @author Алексей
 * @name lc_in_group
 */

var isSelectForm = true;
var isEditable = false;
var canSetEdit = true;
var parentForm = null;
var flatModule = new moduleLC();

function setCurrentGroup(aNewGroupID){
    parGroupID = aNewGroupID;
    return dsflats_by_group.lc_flat_id;
}

function checkIfPossibleToChangeFlat(){
    return parentForm.check4Modifications();
}

function setCurrentFlat(aNewFlatID){
    parentForm.setFlat(aNewFlatID);
}

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

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
}//GEN-LAST:event_formWindowClosing

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
//    dsflats_by_group.insert(dsflats_by_group.md.lc_group, parGroup);
    flatModule.parDateID = parDateID;
    flatModule.addNewLC('', '', 0, parGroupID);
    dsflats_by_group.requery();
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    dsflats_by_group.deleteRow();
}//GEN-LAST:event_btnDelActionPerformed

function dsflats_by_groupWillScroll(evt) {//GEN-FIRST:event_dsflats_by_groupWillScroll
    checkIfPossibleToChangeFlat();
}//GEN-LAST:event_dsflats_by_groupWillScroll

function dsflats_by_groupOnScrolled(evt) {//GEN-FIRST:event_dsflats_by_groupOnScrolled
    setCurrentFlat(dsflats_by_group.lc_id);
}//GEN-LAST:event_dsflats_by_groupOnScrolled
