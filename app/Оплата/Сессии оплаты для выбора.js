/**
 * 
 * @author Алексей
 * @name opl_session_view_choser
 * @public
 */

function opl_session_view_choser() {


var self = this, model = self.model;


var isSelectForm = true;
var isEditable = true;
var canSetEdit = true;
var fmSession = null;

self.mainForm = null;


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
        fmSession = new oplInSession();
        fmSession.mainForm = self.mainForm;
        fmSession.parentForm = self;
    }

    fmSession.init(self.dsOplSessions.opl_sessions_id, self.parDateID,self.parEditDate);
    if (self.mainForm)
        self.mainForm.showFormAsInternal(fmSession);
    else
        fmSession.show();
}


    function modelGridMouseClicked(evt) {//GEN-FIRST:event_modelGridMouseClicked
    if (evt.clickCount > 1)
        self.close(model.dsOplSessions.cursor.opl_sessions_id);
    }//GEN-LAST:event_modelGridMouseClicked

paramSynchronizer.addListener(this);

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        self.close(model.dsOplSessions.cursor.opl_sessions_id);
    }//GEN-LAST:event_buttonActionPerformed
}