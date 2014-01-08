/**
 * 
 * @author Alexey
 * @name formGroupCharacteristics
 * @public
 */

function formGroupCharacteristics() {


var self = this;


function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    dsCalcMethod.insert(dsCalcMethod.md.calc_name, 'Новый метод расчета');
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    confirm('Удалить данный метод расчета стоимости?')&&dsCalcMethod.delete();
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