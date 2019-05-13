/**
 * 
 * @author Алексей
 * @name fmTarifs
 * @public
 */

function fmTarifs() {


var self = this, model = self.model;


self.isSelectForm = true;
self.isEditable = true;
self.canSetEdit = true;
var tarifsModule = new TarifsModule();

function setEdit(){
    self.btnSave.enabled = self.isEditable;    
   // btnAddParent.enabled = isEditable;
    //tbSetEdit.visible = canSetEdit;
    //tbSetEdit.selected = isEditable;
}

self.syncParams = function(aDate, anIsEditable, anAccount) {
    self.modelGrid.editable  = anIsEditable;
    model.params.parDateID = aDate;
    model.params.parAccountID = anAccount;
    //model.params.parDateID = aDate;
    //model.params.parAccountID = anAccount;
};


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
    tarifsModule.addMissingTarifs(self.parDateID, self.parGroupID, self.parAccountID);
    tarifsModule.applyTarifs(self.parDateID, self.parGroupID, self.parAccountID);
    self.tarifsInGroup.requery();
}//GEN-LAST:event_button1ActionPerformed

    paramSynchronizer.addListener(this);

    function btnRecalcActionPerformed(evt) {//GEN-FIRST:event_btnRecalcActionPerformed
        var rate = prompt('Ставка перерасчета', model.tarifsInGroup.cursor.rate);
        var oldRate = model.tarifsInGroup.cursor.rate;
        tarifsModule.recalc(self.parDateID, self.parGroupID, self.parAccountID, model.tarifsInGroup.cursor.services_id, rate, oldRate);
    }//GEN-LAST:event_btnRecalcActionPerformed
}