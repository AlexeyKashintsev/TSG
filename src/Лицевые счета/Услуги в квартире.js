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
tbSetEdit.visible = self.canSetEdit;
    tbSetEdit.selected = self.isEditable;
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
    fmSelectServicesId.isSelectForm = true;
    fmSelectServicesId.showModal(
        function(aValue){
           //services_by_flat.insert();
           //services_by_flat.services_id = aValue;
           self.dsServices.insert(   self.dsServices.md.services_id, aValue,
                                self.dsServices.md.lc_id, self.parFlatID);
        });  
        
    
            
        ////self.dsServices.insert(self.dsServices.md.services_id, *ServIDGet*,
                //      self.dsServices.md.lc_id, self.parFlatID);
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    self.dsServices.delete();
}//GEN-LAST:event_btnDelActionPerformed

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
}//GEN-LAST:event_formWindowClosing

function btnUpActionPerformed(evt) {//GEN-FIRST:event_btnUpActionPerformed
if (self.dsServices.rowIndex != 1)
    {
    self.a = self.dsServices.lc_flat_services_id;
    self.dsServices.lc_flat_services_id = 0;
    self.dsServices.prev();
    self.b = self.dsServices.lc_flat_services_id;
    self.dsServices.lc_flat_services_id = self.a;
    self.dsServices.next();
    self.dsServices.lc_flat_services_id = self.b;
    self.model.save();
    self.model.requery();
    }	
}//GEN-LAST:event_btnUpActionPerformed

function btnDownActionPerformed(evt) {//GEN-FIRST:event_btnDownActionPerformed
if (self.dsServices.rowIndex != self.dsServices.length)
    {
    self.a = self.dsServices.lc_flat_services_id;
    self.dsServices.lc_flat_services_id = 0;
    self.dsServices.next();
    self.b = self.dsServices.lc_flat_services_id;
    self.dsServices.lc_flat_services_id = self.a;
    self.dsServices.prev();
    self.dsServices.lc_flat_services_id = self.b;
    self.model.save();
    self.model.requery();
    }
}//GEN-LAST:event_btnDownActionPerformed

}