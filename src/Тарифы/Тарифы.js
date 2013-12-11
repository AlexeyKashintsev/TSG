/**
 * 
 * @author Алексей
 * @name fmTarifs
 * @public
 */

function fmTarifs() {


var self = this;


self.isSelectForm = true;
self.isEditable = true;
self.canSetEdit = true;
var tarifsModule = new TarifsModule();

function setEdit(){
    self.modelGrid.editable = self.btnSave.enabled = self.isEditable;    
   // btnAddParent.enabled = isEditable;
    //tbSetEdit.visible = canSetEdit;
    //tbSetEdit.selected = isEditable;
}

function setElShown(){
    setEdit();
    if (!self.isSelectForm){
        pnlSelLock.visible = false;
        self.pnlWorkSpace.height += 48;
        self.modelGrid.bottom += 48;
    }
}

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    self.model.save();
}//GEN-LAST:event_btnSaveActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    setElShown();
}//GEN-LAST:event_formWindowOpened

function tbSetEditActionPerformed(evt) {//GEN-FIRST:event_tbSetEditActionPerformed
    self.isEditable = tbSetEdit.selected;
    setEdit();
}//GEN-LAST:event_tbSetEditActionPerformed

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
}//GEN-LAST:event_formWindowClosing

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
    tarifsModule.addMissingTarifs(self.parDateID, self.parGroupID);
    tarifsModule.applyTarifs(self.parDateID, self.parGroupID);
    self.tarifsInGroup.requery();
}//GEN-LAST:event_button1ActionPerformed

}