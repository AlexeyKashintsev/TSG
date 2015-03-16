/**
 * 
 * @author Алексей
 * @name template
 * @public
 */

function formBankParams() {


var self = this, model = self.model;


var isSelectForm = true;
var isEditable = true;
var canSetEdit = true;

function setEdit(){
    self.modelGrid.editable = self.btnAdd.enabled = 
            self.btnDel.enabled = self.btnSave.enabled = isEditable;    
    //self.btnAddParent.enabled = isEditable;
    
}

function setElShown(){
    setEdit();
    if (!isSelectForm){
        self.pnlSelLock.visible = false;
        self.pnlWorkSpace.height += 48;
        self.modelGrid.bottom += 48;
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

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
}//GEN-LAST:event_formWindowClosing

    function btnSelectActionPerformed(evt) {//GEN-FIRST:event_btnSelectActionPerformed
        if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
        }
        self.close(self.bank_queries.grp_bank_id);
    }//GEN-LAST:event_btnSelectActionPerformed

    function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
        model.bank_queries.insert();
    }//GEN-LAST:event_btnAddActionPerformed

    function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
        // TODO Добавьте свой код:
    }//GEN-LAST:event_btnDelActionPerformed
}