/**
 * 
 * @author Алексей
 * @name opl_session_view
 * @public
 */

function opl_session_view() {


var self = this, model = self.model;


var isSelectForm = true;
var isEditable = true;
var canSetEdit = true;
var fmSession = null;

self.mainForm = null;
Logger.warning('opl_session_view start');


self.updateSession = function(){
    self.model.requery();
};


self.syncParams = function(aDate, anIsEditable, anAccount) {
    model.params.parEditDate = anIsEditable;
    model.params.parDateID = aDate;
    model.params.parAccountID = anAccount;    
    //model.params.parDateID = aDate;
    //model.params.parAccountID = anAccount;
};

function openCurrentSession(){
    if (!fmSession) {
        Logger.warning('oplInSession init start');
        fmSession = new oplInSession();
        fmSession.mainForm = self.mainForm;
        fmSession.parentForm = self;
        Logger.warning('oplInSession init done');
    }

    Logger.warning('Setting up new session with id = ' + self.dsOplSessions.opl_sessions_id);
    fmSession.init(self.dsOplSessions.opl_sessions_id, self.parDateID,self.parEditDate);
    if (self.mainForm)
        self.mainForm.showFormAsInternal(fmSession);
    else
        fmSession.show();
}

function setEdit(){
    self.modelGrid.editable = self.btnAdd.enabled = 
            self.btnDel.enabled = self.btnSave.enabled = isEditable;    
    
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
        self.dsOplSessions.insert(self.dsOplSessions.schema.date_id, self.parDateID,
                                  self.dsOplSessions.schema.opl_comment, 
                                  self.tfSesComment.text!='Комментарий к новой сессии'?
                                  self.tfSesComment.text:'',
                                  self.dsOplSessions.schema.opl_date,  new Date(),
                                  self.dsOplSessions.schema.account_id, self.parAccountID);
        self.model.save();
        openCurrentSession();
    }//GEN-LAST:event_btnAddActionPerformed

    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    self.model.save();
    }//GEN-LAST:event_btnSaveActionPerformed

    function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
        if (confirm('Удаление текущей сессии приведет к удалению всех оплат,\n содержащихся в ней. Продолжить?')){
            self.dsOplSessions.deleteRow();
        }
    }//GEN-LAST:event_btnDelActionPerformed

    function modelGridMouseClicked(evt) {//GEN-FIRST:event_modelGridMouseClicked
    if (evt.clickCount > 1)
        openCurrentSession();        // TODO Добавьте свой код:
    }//GEN-LAST:event_modelGridMouseClicked

paramSynchronizer.addListener(this);
}