/**
 * 
 * @author Алексей
 * @name fmCounterValuesByFlat
 * @public
 */

function fmCounterValuesByFlat() {


var self = this, model = self.model;


self.isSelectForm = false;
self.isEditable = true;

/*self.model.params.parFlatID = 139704089624312;
self.model.params.parDateID = 139696955465754;*/
    


function setEdit(){ 
    self.btnSave.enabled = self.isEditable;    
}

self.syncParams = function(aDate, anIsEditable, anAccount) {
    model.params.parDateID = aDate;
    model.params.parAccountID = anAccount;
    self.modelGrid.editable = anIsEditable;
};

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
    setEdit();
}//GEN-LAST:event_formWindowOpened

function colBegValueOnSelect(aEditor) {//GEN-FIRST:event_colBegValueOnSelect
    var fmSelectCalcType = new Form('fmCalcType');
    var res = null;
    fmSelectCalcType.isSelectForm = true;
    fmSelectCalcType.showModal(function(aValue){
        dsServices.calc_id = aValue;        
    });
}//GEN-LAST:event_colBegValueOnSelect

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
}//GEN-LAST:event_formWindowClosing

paramSynchronizer.addListener(this);
}