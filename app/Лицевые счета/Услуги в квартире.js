/**
 * 
 * @author Алексей
 * @name fmServicesByFlat
 * @public
 */

function fmServicesByFlat() {
    var self = this, model = self.model;

    self.isSelectForm = true;
    self.isEditable = true;
    self.canSetEdit = false;

    function setEdit() {
        modelGrid.editable = self.btnAdd.enabled =
                self.btnDel.enabled = self.btnSave.enabled = self.isEditable;
        self.tbSetEdit.visible = self.canSetEdit;
        self.tbSetEdit.selected = self.isEditable;
    }
    
    self.setGroupId = function(aGroupId) {
        model.params.parGroupID = aGroupId;
    };
    
    self.setLcId = function(aFlatId) {
        model.params.parFlatID = aFlatId;
    };

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
        if (model.modified && confirm('Сохранить изменения?')) {
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
                function(aValue) {
                    model.dsServices.calc_id = aValue;
                }
        );
}//GEN-LAST:event_colCalcTypeOnSelect

function btnAddActionPerformed() {//GEN-FIRST:event_btnAddActionPerformed
        /*
         * При добавлении услуги в квартиру, услуга добавляется, НО:
         * так как данной услуги в услугах по группе может не быть,то счетчик по данной услуге не будет отображаться,
         * так как у этой услуги значение запрашивания на показания в услугах группы равно False;
         */
        var fmSelectServicesId = new ServicesForm();
        var res = null;
        var lc_mod = new LCModule();
        fmSelectServicesId.isSelectForm = true;
        fmSelectServicesId.showModal(
                function(aValue) {
                    var fs = lc_mod.addServiceToLC(model.params.parFlatID, aValue.service, aValue.byCounter,
                            aValue.begDate ? aValue.begDate : model.params.parDateID,
                            model.params.parAccountID, aValue.endDate);
                    lc_mod.saveChanges();
                    model.requery();
                });
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
        model.dsServices.delete();
}//GEN-LAST:event_btnDelActionPerformed

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
        if (model.modified && confirm('Сохранить изменения?')) {
            model.save();
        }
}//GEN-LAST:event_formWindowClosing
    paramSynchronizer.addListener(this);
}