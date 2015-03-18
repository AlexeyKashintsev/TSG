/**
 * 
 * @author Алексей
 * @name AllIssuues
 * @public
 */

function AllIssues() {


var self = this, model = self.model;


var isSelectForm = true;
var isEditable = false;
var canSetEdit = true;
var fmIssuesByFlat = new formLcIssues();
self.mainForm = null;

function setEdit(){
    self.modelGrid.editable = self.btnAdd.enabled =
            self.btnDel.enabled = self.btnSave.enabled = isEditable;    
    
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
    model.params.parDisplay = 'Все проблемы'
    setEdit();    
}//GEN-LAST:event_formWindowOpened

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
}//GEN-LAST:event_formWindowClosing

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    
}//GEN-LAST:event_btnAddActionPerformed


    function modelGridMouseClicked(evt) {//GEN-FIRST:event_modelGridMouseClicked
        if (evt.clickCount > 1){
            fmIssuesByFlat.mainForm = self.mainForm;
            fmIssuesByFlat.parentForm = self;
            fmIssuesByFlat.model.params.parDateID = self.allIssues.per_date_id;
            fmIssuesByFlat.model.params.parFlat = self.allIssues.lc_flat_id;
            fmIssuesByFlat.model.params.parGroup = self.allIssues.grp_groups_id;
            
            fmIssuesByFlat.setBtnVisible();
            self.mainForm.showFormAsInternal(fmIssuesByFlat);
        }
    }//GEN-LAST:event_modelGridMouseClicked
}