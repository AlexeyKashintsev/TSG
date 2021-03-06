/**
 * 
 * @author TSG
 */
function formAccountParams() {
    var self = this, model = this.model, form = this;
    var fmBankSel = null;
    self.selector = false;
    self.mainForm = null;
    
    // TODO : place your code here

function processVisible(){
    self.btnSelect.visible = self.selector;
   // !toolBarVisible&&(self.modelGrid.top=0);
}

    function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
    self.model.requery();
    }//GEN-LAST:event_btnReqActionPerformed

    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    self.model.save();
    self.mainForm.model.requery();
    }//GEN-LAST:event_btnSaveActionPerformed

    function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
        model.dsAllAccounts.insert();
    }//GEN-LAST:event_btnAddActionPerformed

    function btnSelectActionPerformed(evt) {//GEN-FIRST:event_btnSelectActionPerformed
        self.close(self.dsAllAccounts.grp_account_id);
    }//GEN-LAST:event_btnSelectActionPerformed

    function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
        processVisible();        
    }//GEN-LAST:event_formWindowOpened

    function colBankOnSelect(aEditor) {//GEN-FIRST:event_colBankOnSelect
        var fmBankSel = new formBankParams();
        fmBankSel.isSelectForm = true;
        fmBankSel.showModal(function(aValue){
            model.dsAllAccounts.cursor.bank = aValue;
        });
    }//GEN-LAST:event_colBankOnSelect

    function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
        if (self.model.modified&&confirm('Сохранить изменения?')){
        model.save();
        self.mainForm.model.requery();
        }        
    }//GEN-LAST:event_formWindowClosing
}
