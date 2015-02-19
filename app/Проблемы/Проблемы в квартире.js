/**
 * 
 * @author Alexey
 * @name formLcIssues
 * @public
 */

function formLcIssues() {


var self = this, model = self.model;
self.parentForm = null;
self.mainForm = null;


function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    model.issues_by_flat.cursor.issue_comment = self.taProblemText.text;
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
    model.requery();
    self.taProblemText.text = model.issues_by_flat.cursor.issue_comment;
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    model.issues_by_flat.cursor.issue_comment = self.taProblemText.text;
    model.save();
    self.parentForm.model.requery();
}//GEN-LAST:event_btnSaveActionPerformed

self.setBtnVisible = function (){
    self.taProblemText.text = model.issues_by_flat.cursor.issue_comment;
    /*if(self.issues_by_flat.length == 0)
        {self.modelCombo.visible = self.modelFormattedField.visible =
         self.label.visible = self.label1.visible = false;}
    else {self.modelCombo.visible = self.modelFormattedField.visible =
         self.label.visible = self.label1.visible = true; } */    
}


function formWindowOpened(evt) {                                  
        self.model.requery();
        }  
        
paramSynchronizer.addListener(this);
}