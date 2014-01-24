/**
 * 
 * @author Алексей
 * @name formServicesInGroup
 * @public
 */

function formServicesInGroup() {


var self = this;


self.isSelectForm = false;
self.isEditable = true;
var canSetEdit = false;

function setEdit(){
    self.modelGrid.editable = self.btnAdd.enabled = 
            self.btnDel.enabled = self.btnSave.enabled = self.isEditable;    
    //tbSetEdit.visible = canSetEdit;
    //tbSetEdit.selected = isEditable;
}

function setElShown(){
    setEdit();
    if (!self.isSelectForm){
        //pnlSelLock.visible = false;
        self.pnlWorkSpace.height += 48;
        self.modelGrid.bottom += 48;
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

function colCalcTypeOnSelect(aEditor) {//GEN-FIRST:event_colCalcTypeOnSelect
    var fmSelectCalcType = new Form('fmCalcType');
    var res = null;
    fmSelectCalcType.isSelectForm = true;
    fmSelectCalcType.showModal(function(aValue){
        self.dsServices.calc_id = aValue;
    });
}//GEN-LAST:event_colCalcTypeOnSelect

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    self.dsServices.insert(self.dsServices.md.group_id, self.parGroup);
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
    if (self.dsServices.rowIndex != 1){
        var services_id = self.dsServices.grp_services_id;
        self.dsServices.grp_services_id = 0;
        self.dsServices.prev();
        var prev_services_id = self.dsServices.grp_services_id;
        self.dsServices.grp_services_id = services_id;
        self.dsServices.next();
        self.dsServices.grp_services_id = prev_services_id;
        self.model.save();
        self.dsServices.requery(function(){
            self.dsServices.scrollTo(self.dsServices.findById(prev_services_id));
            self.dsServices.setselected = true;
        });
    }
}//GEN-LAST:event_btnUpActionPerformed

function btnDownActionPerformed(evt) {//GEN-FIRST:event_btnDownActionPerformed
if (self.dsServices.rowIndex != self.dsServices.length)
    {
    var services_id = self.dsServices.grp_services_id;
    self.dsServices.grp_services_id = 0;
    self.dsServices.next();
    var next_services_id = self.dsServices.grp_services_id;
    self.dsServices.grp_services_id = services_id;
    self.dsServices.prev();
    self.dsServices.grp_services_id = next_services_id;
    self.model.save();
    self.dsServices.requery(function(){
            self.dsServices.scrollTo(self.dsServices.findById(next_services_id));
            self.dsServices.selected = true;
        });
    }
}//GEN-LAST:event_btnDownActionPerformed

}