/**
 * 
 * @author Алексей
 * @name fmServicesByFlat
 * @public
 */

function fmServicesByFlat() {


var self = this;


self.isSelectForm = true;
self.isEditable = true;
self.canSetEdit = false;

function setEdit(){
    self.modelGrid.editable = self.btnAdd.enabled = 
            self.btnDel.enabled = self.btnSave.enabled = self.isEditable;    
    self.tbSetEdit.visible = self.canSetEdit;
    self.tbSetEdit.selected = self.isEditable;
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

}//GEN-LAST:event_formWindowOpened

function colCalcTypeOnSelect(aEditor) {//GEN-FIRST:event_colCalcTypeOnSelect
    var fmSelectCalcType = new Form('fmCalcType');
    var res = null;
    fmSelectCalcType.isSelectForm = true;
    fmSelectCalcType.showModal(
        function(aValue){
            self.dsServices.calc_id = aValue;
        }
    );
}//GEN-LAST:event_colCalcTypeOnSelect

function btnAddActionPerformed() {//GEN-FIRST:event_btnAddActionPerformed
    var fmSelectServicesId = new ServicesForm();
    var res = null;
    var lc_mod = new LCModule();
    fmSelectServicesId.isSelectForm = true;
    fmSelectServicesId.showModal(
        function(aValue){
            var fs = lc_mod.addServiceToLC( self.parFlatID, aValue.service, aValue.byCounter,
                                            aValue.begDate?aValue.begDate:self.parDateID,
                                            self.parAccountID, aValue.endDate);
            lc_mod.saveChanges();
            self.model.requery();
        });
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    self.dsServices.delete();
}//GEN-LAST:event_btnDelActionPerformed

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
}//GEN-LAST:event_formWindowClosing

}