/**
 * 
 * @author Алексей
 * @name oplInSession
 * @public
 */

function oplInSession() {


var self = this;


var isSelectForm = true;
var isEditable = false;
var canSetEdit = true;
var fmNewOplata = new opl_get();
self.parentForm = null;
self.mainForm = null;

function setEdit(){
    self.modelGrid.editable = 
            self.btnDel.enabled = self.btnSave.enabled = isEditable;    
    self.btnAddParent.enabled = isEditable;
    self.tbSetEdit.visible = canSetEdit;
    self.tbSetEdit.selected = isEditable;
}

self.updateSession = function(){
    self.model.requery();
    self.parentForm.updateSession();
};

self.init = function (aSessionID, aDateID){
    self.parDateID = aDateID;
    self.parSessionID = aSessionID;
};


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
    setEdit();
}//GEN-LAST:event_formWindowOpened

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
}//GEN-LAST:event_formWindowClosing

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    fmNewOplata.parDateID = self.parDateID;
    fmNewOplata.parSessionID = self.parSessionID;
    fmNewOplata.parentForm = self;
    if (self.mainForm)
        self.mainForm.showFormAsInternal(fmNewOplata);
    else
        fmNewOplata.show();
}//GEN-LAST:event_btnAddActionPerformed

}