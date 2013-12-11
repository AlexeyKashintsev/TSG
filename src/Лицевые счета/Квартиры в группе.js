/**
 * 
 * @author Алексей
 * @name lc_in_group
 * @public
 */

function lc_in_group() {


var self = this;


var isSelectForm = true;
var isEditable = false;
var canSetEdit = true;
var parentForm = null;
var flatModule = new LCModule();

function setCurrentGroup(aNewGroupID){
    self.parGroupID = aNewGroupID;
    return self.dsflats_by_group.lc_flat_id;
}

function checkIfPossibleToChangeFlat(){
    return parentForm.check4Modifications();
}

function setCurrentFlat(aNewFlatID){
    parentForm.setFlat(aNewFlatID);
}

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
    }
}

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
    self.model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    self.model.save();
}//GEN-LAST:event_btnSaveActionPerformed

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

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
//    self.dsflats_by_group.insert(self.dsflats_by_group.md.lc_group, parGroup);
    flatModule.parDateID = self.parDateID;
    flatModule.addNewLC('', '', 0, self.parGroupID);
    self.dsflats_by_group.requery();
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    self.dsflats_by_group.deleteRow();
}//GEN-LAST:event_btnDelActionPerformed

function dsflats_by_groupWillScroll(evt) {//GEN-FIRST:event_dsflats_by_groupWillScroll
    checkIfPossibleToChangeFlat();
}//GEN-LAST:event_dsflats_by_groupWillScroll

function dsflats_by_groupOnScrolled(evt) {//GEN-FIRST:event_dsflats_by_groupOnScrolled
    setCurrentFlat(self.dsflats_by_group.lc_flat_id);
}//GEN-LAST:event_dsflats_by_groupOnScrolled

}