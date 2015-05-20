/**
 * 
 * @author Алексей
 * @name template
 * @public
 */

function fmGroupsByLC() {
    var self = this, model = self.model;
    var grpMod = null, grpForm = null;

    function setEdit() {
        self.modelGrid.editable = self.btnAdd.enabled =
                self.btnDel.enabled = self.btnSave.enabled = isEditable;
    }
    
    self.setLcId = function(aFlatId) {
        model.params.parFlatID = aFlatId;
    };

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
        if (self.model.modified && confirm('Сохранить изменения?')) {
            self.model.save();
        }
        self.model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
        self.model.save();
}//GEN-LAST:event_btnSaveActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    
}//GEN-LAST:event_formWindowOpened

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
        if (self.model.modified && confirm('Сохранить изменения?')) {
            self.model.save();
        }
}//GEN-LAST:event_formWindowClosing

    function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
        if (!grpMod)
            grpMod = new LCModule();
        if (!grpForm)
            grpForm = new formGroups();
        grpForm.selector = true;
        grpForm.showModal(function(aGroup) {
            if (!!aGroup) {
                grpMod.addFlat2ModifyingGroup(model.params.parFlatID, aGroup, []);
                grpMod.saveChanges();
            }
            model.requery();
        });
    }//GEN-LAST:event_btnAddActionPerformed
}