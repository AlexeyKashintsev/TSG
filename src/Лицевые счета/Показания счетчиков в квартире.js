/**
 * 
 * @author Алексей
 * @name fmCounterValuesByFlat
 * @public
 */

function fmCounterValuesByFlat() {


var self = this;


var isSelectForm = false;
var isEditable = true;

function setEdit(){
    self.modelGrid.editable = self.btnSave.enabled = isEditable;    
}

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

function colBegValueOnSelect(aEditor) {//GEN-FIRST:event_colBegValueOnSelect
    var fmSelectCalcType = new Form('fmCalcType');
    var res = null;
    fmSelectCalcType.isSelectForm = true;
    fmSelectCalcType.showModal(function(aValue){
        dsServices.calc_id = aValue;
    });
}//GEN-LAST:event_colBegValueOnSelect

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
}//GEN-LAST:event_formWindowClosing

}