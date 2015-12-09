/**
 * 
 * @name fmAccountsByGroup
 * @author TSG
 */
function fmAccountsByGroup() {
    var self = this, model = this.model, form = this;
    var Accounts = null;
    
    // TODO : place your code here

    self.syncParams = function(aDate, anIsEditable, anAccount) {
        model.params.parDateID = aDate;
        model.requery();
        //model.params.parAccountID = anAccount;
    };


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
                    var grpMod = new ServerModule('GroupsModule');
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
        if(confirm('Вы хотите перенести начисление пени во все квартиры?')){
            model.dsAccountsByGroup.forEach(function(aAccount){
                var calc_peni = aAccount.calculate_peni;
                model.flats_by_group.requery();
                model.flats_by_group.forEach(function(aFlat){
                    model.saldo_by_flat.params.account_id = aAccount.account_id;
                    model.saldo_by_flat.params.flat_id = aFlat.lc_flat_id;
                    model.saldo_by_flat.requery();
                    model.saldo_by_flat.cursor.calc_peni = calc_peni;
                });
            });
            model.save();
        } else {
            model.save();
        };
    }//GEN-LAST:event_btnSaveActionPerformed

    function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
        model.dsAccountsByGroup.delete();
    }//GEN-LAST:event_btnDelActionPerformed

    paramSynchronizer.addListener(this);
}
