/**
 * 
 * @author Алексей
 * @name fmTarifs
 * @public
 */

function fmTarifs() {


var self = this;


var isSelectForm = true;
var isEditable = true;
var canSetEdit = true;
var tarifsModule = new TarifsModule();

function setEdit(){
    self.modelGrid.editable = self.btnSave.enabled = isEditable;    
   // btnAddParent.enabled = isEditable;
    //tbSetEdit.visible = canSetEdit;
    //tbSetEdit.selected = isEditable;
}

function setElShown(){
    setEdit();
    if (!isSelectForm){
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
    isEditable = tbSetEdit.selected;
    setEdit();
}//GEN-LAST:event_tbSetEditActionPerformed

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
}//GEN-LAST:event_formWindowClosing

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
    tarifsModule.addNewTarifs(self.parDateID,self.parGroupID);
    self.tarifsInGroup.requery()
}//GEN-LAST:event_button1ActionPerformed

}