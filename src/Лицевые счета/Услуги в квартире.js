/**
 * 
 * @author Алексей
 * @name fmServicesByFlat
 * @public
 */

var isSelectForm = true;
var isEditable = true;
var canSetEdit = false;

function setEdit(){
    modelGrid.editable = btnAdd.enabled = 
            btnDel.enabled = btnSave.enabled = isEditable;    
tbSetEdit.visible = canSetEdit;
    tbSetEdit.selected = isEditable;
}


function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
    model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    model.save();
}//GEN-LAST:event_btnSaveActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened

}//GEN-LAST:event_formWindowOpened

function colCalcTypeOnSelect(aEditor) {//GEN-FIRST:event_colCalcTypeOnSelect
    var fmSelectCalcType = new Form('fmCalcType');
    var res = null;
    fmSelectCalcType.isSelectForm = true;
    fmSelectCalcType.showModal(
        function(aValue){
            dsServices.calc_id = aValue;
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
           services_by_flat.insert(   dsServices.md.services_id, aValue,
                                dsServices.md.lc_id, parFlatID);
        });  
        
    
            
        ////dsServices.insert(dsServices.md.services_id, *ServIDGet*,
                //      dsServices.md.lc_id, parFlatID);
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    dsServices.delete();
}//GEN-LAST:event_btnDelActionPerformed

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
}//GEN-LAST:event_formWindowClosing
