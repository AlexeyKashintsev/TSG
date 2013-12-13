/**
 * 
 * @author Алексей
 * @name opl_session_view
 * @public
 */

function opl_session_view() {


var self = this;


var isSelectForm = true;
var isEditable = false;
var canSetEdit = true;

function setEdit(){
    self.modelGrid.editable = self.btnAdd.enabled = 
            self.btnDel.enabled = self.btnSave.enabled = isEditable;    
    self.btnAddParent.enabled = isEditable;
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

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    setElShown();
}//GEN-LAST:event_formWindowOpened

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
}//GEN-LAST:event_formWindowClosing


    function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
        self.dsOplSessions.insert(self.dsOplSessions.md.date_id, self.parDateID,
                                  self.dsOplSessions.md.opl_comment, 
                                  self.tfSesComment.text!='Комментарий к новой сессии'?
                                  self.tfSesComment.text:'',
                                  self.dsOplSessions.md.opl_date,  new Date());
        self.model.save();
    }//GEN-LAST:event_btnAddActionPerformed

    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    self.model.save();
    }//GEN-LAST:event_btnSaveActionPerformed

    function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
        if (confirm('Удаление текущей сессии приведет к удалению всех оплат,\n содержащихся в ней. Продолжить?')){
            
        }
    }//GEN-LAST:event_btnDelActionPerformed
}