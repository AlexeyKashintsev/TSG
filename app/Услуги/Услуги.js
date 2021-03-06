/**
 * 
 * @author Алексей
 * @name ServicesForm
 * @public
 */

function ServicesForm() {


var self = this;
self.mainForm = null;


var isSelectForm = true;
var isEditable = true;
var canSetEdit = false;

function setEdit(){
    self.modelGrid.editable = self.btnAdd.enabled = 
            self.btnDel.enabled = self.btnSave.enabled = isEditable;    
    self.tbSetEdit.visible = canSetEdit;
    self.tbSetEdit.selected = isEditable;
}

function setElShown(){
    setEdit();
    if (!isSelectForm){
        self.pnlSelLock.visible = false;
    }
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
    setElShown();
}//GEN-LAST:event_formWindowOpened

function tbSetEditActionPerformed(evt) {//GEN-FIRST:event_tbSetEditActionPerformed
    isEditable = self.tbSetEdit.selected;
    setEdit();
}//GEN-LAST:event_tbSetEditActionPerformed

function colCalcTypeOnSelect(aEditor) {//GEN-FIRST:event_colCalcTypeOnSelect
    var fmSelectCalcType = new Form('fmCalcType');
    var res = null;
    fmSelectCalcType.isSelectForm = true;
    fmSelectCalcType.showModal(function(aValue){
        self.dsServices.calc_id = aValue;
    });
}//GEN-LAST:event_colCalcTypeOnSelect

function colServicesOnInsert(aEditor){
    var fmSelectServicesId = new Form('fmServices');
    var res = null;
    fmSelectServicesId.isSelectForm = true;
    fmSelectServicesId.showModal(
        function(aValue){
           services_by_flat.services_id = aValue;           
        });  
};

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    self.dsServices.insert(self.dsServices.schema.parent_service, self.dsServices.parent_service);
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    self.dsServices.delete();
}//GEN-LAST:event_btnDelActionPerformed

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
}//GEN-LAST:event_formWindowClosing

function btnSelectActionPerformed(evt) {//GEN-FIRST:event_btnSelectActionPerformed
        self.close({
            service     : self.dsServices.usl_services_id,
            byCounter   : self.dsServices.calc_by_counter,
            begDate     : self.model.params.parBeg,
            endDate     : self.model.params.parEnd,
            service_name: self.model.dsServices.usl_name,
            calc_by_counter: self.model.dsServices.calc_by_counter
        });
}//GEN-LAST:event_btnSelectActionPerformed

}