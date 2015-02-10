/**
 * 
 * @author TSG
 */
function fmAccountsByGroup() {
    var self = this, model = this.model, form = this;
    var Accounts = null;
    
    // TODO : place your code here

    function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
        Accounts = new formAccountParams();
        Accounts.selector = true;
        Accounts.showModal(function(aAccount){
            if (aAccount)
                model.dsAccountsByGroup.insert(self.dsAccountsByGroup.schema.group_id, model.params.parGroupID,
                                               self.dsAccountsByGroup.schema.account_id, aAccount);
            model.save();
            model.requery();        
        });
        
    }//GEN-LAST:event_btnAddActionPerformed

    function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
    self.model.requery();
    }//GEN-LAST:event_btnReqActionPerformed

    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    self.model.save();
    }//GEN-LAST:event_btnSaveActionPerformed
}
