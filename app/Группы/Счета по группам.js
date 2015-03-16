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
            if (aAccount){
                if(model.dsAccountsByGroup.find(model.dsAccountsByGroup.schema.account_id, aAccount).length !== 0)                
                    alert('Уже есть такой счет в группе');                
                else
                {
                    model.dsAccountsByGroup.insert(self.dsAccountsByGroup.schema.group_id, model.params.parGroupID,
                                                   self.dsAccountsByGroup.schema.account_id, aAccount);
                    var grpMod = new ServerModule('groups_module');
                    grpMod.addSaldo2Flats(model.params.parGroupID, aAccount);
                    model.save();
                    model.requery();
                }            
            }
        });
        
    }//GEN-LAST:event_btnAddActionPerformed

    function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
    model.requery();
    }//GEN-LAST:event_btnReqActionPerformed

    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    model.save();
    }//GEN-LAST:event_btnSaveActionPerformed

    function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
        model.dsAccountsByGroup.delete();
    }//GEN-LAST:event_btnDelActionPerformed
}
