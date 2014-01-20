/**
 * 
 * @author Alexey
 * @name formGroupCharacteristics
 * @public
 */

function formGroupCharacteristics() {


var self = this;


function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    self.chars_by_group.insert(self.chars_by_group.md.grp_group_id, self.parGroup);
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    confirm('Удалить характеристику?')&&self.chars_by_group.delete();
}//GEN-LAST:event_btnDelActionPerformed

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (self.model.modified()&&confirm('Сохранить изменения?')){
        self.model.save();
    }
    self.model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    self.model.save();
}//GEN-LAST:event_btnSaveActionPerformed


    function mcBankOnSelect(aEditor) {//GEN-FIRST:event_mcBankOnSelect
        var fmBankSel = new formBankParams();
        fmBankSel.isSelectForm = true;
        fmBankSel.showModal(function(aValue){
            self.dsGroupByID.bank = aValue;
        });
    }//GEN-LAST:event_mcBankOnSelect
}