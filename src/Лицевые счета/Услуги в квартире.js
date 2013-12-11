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
    var fmSelectServicesId = new Form('fmServices');
    var res = null;
    fmSelectServicesId.isSelectForm = true;
    fmSelectServicesId.showModal(
        function(aValue){
           //services_by_flat.insert();
           //services_by_flat.services_id = aValue;
           services_by_flat.insert(   self.dsServices.md.services_id, aValue,
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

}