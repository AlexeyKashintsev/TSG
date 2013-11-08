/**
 * 
 * @author Алексей
 * @name formServicesInGroup
 * @public
 */

var isSelectForm = false;
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

function colCalcTypeOnSelect(aEditor) {//GEN-FIRST:event_colCalcTypeOnSelect
    var fmSelectCalcType = new Form('fmCalcType');
    var res = null;
    fmSelectCalcType.isSelectForm = true;
    fmSelectCalcType.showModal(function(aValue){
        dsServices.calc_id = aValue;
    });
}//GEN-LAST:event_colCalcTypeOnSelect

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    dsServices.insert(dsServices.md.group_id, parGroup);
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    dsServices.delete();
}//GEN-LAST:event_btnDelActionPerformed

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
}//GEN-LAST:event_formWindowClosing
