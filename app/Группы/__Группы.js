/**
 * 
 * @author Alexey
 * @name formAllGroups
 * @public
 */

function formAllGroups() {


var self = this;
self.parentForm = null;


var fmTarif = new fmTarifs();

function check4Modifications(){
    if ((!self.dsChars.modified&&!self.dsServices.modified)
            ||askAndSave()){
            //||confirm('Не сохраненные изменения будут утеряны. Продолжить?')){
            return true;
        }
    else return false;
}

function askAndSave(){
    if (confirm('Сохранить изменения')){
        self.model.save();
        return true;
    } else return false;
}

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    fmTarif.modelCombo.visible = false;
    fmTarif.showOnPanel(self.pnlTarifs);
}//GEN-LAST:event_formWindowOpened

function button11ActionPerformed(evt) {//GEN-FIRST:event_button11ActionPerformed
    var p = self.dsGroups.grp_parent;
    self.dsGroups.insert(self.dsGroups.schema.grp_parent, p);
}//GEN-LAST:event_button11ActionPerformed

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
    var p = self.dsGroups.grp_groups_id;
    self.dsGroups.insert(self.dsGroups.schema.grp_parent, p);
}//GEN-LAST:event_button1ActionPerformed

function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
    if (confirm('Удалить текущую группу'))
        self.dsGroups.delete();
}//GEN-LAST:event_buttonActionPerformed

function button3ActionPerformed(evt) {//GEN-FIRST:event_button3ActionPerformed
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
    self.model.requery();
}//GEN-LAST:event_button3ActionPerformed

function button2ActionPerformed(evt) {//GEN-FIRST:event_button2ActionPerformed
    self.model.save();
}//GEN-LAST:event_button2ActionPerformed

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    self.dsServices.insert(self.dsServices.schema.group_id, self.dsGroups.grp_groups_id);
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    self.dsServices.delete();
}//GEN-LAST:event_btnDelActionPerformed

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
    self.model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function colCalcTypeOnSelect(aEditor) {//GEN-FIRST:event_colCalcTypeOnSelect
    var fmSelectCalcType = new Form('fmCalcType');
    var res = null;
    fmSelectCalcType.isSelectForm = true;
    fmSelectCalcType.showModal(function(aValue){
        self.dsServices.calc_id = aValue;
    });
}//GEN-LAST:event_colCalcTypeOnSelect

function btnAdd1ActionPerformed(evt) {//GEN-FIRST:event_btnAdd1ActionPerformed
    self.dsChars.insert(self.dsChars.schema.grp_group_id, self.dsGroups.grp_groups_id,
                   self.dsChars.schema.add_char_to_lc, true,
                   self.dsChars.schema.char_calc_by_lc, true);
}//GEN-LAST:event_btnAdd1ActionPerformed

function btnDel1ActionPerformed(evt) {//GEN-FIRST:event_btnDel1ActionPerformed
    confirm('Удалить характеристику?')&&self.dsChars.delete();
}//GEN-LAST:event_btnDel1ActionPerformed

function btnReq1ActionPerformed(evt) {//GEN-FIRST:event_btnReq1ActionPerformed
    if (self.model.modified()&&confirm('Сохранить изменения?')){
        self.model.save();
    }
    self.model.requery();
}//GEN-LAST:event_btnReq1ActionPerformed

function dsGroupsWillScroll(evt) {//GEN-FIRST:event_dsGroupsWillScroll
    if (check4Modifications())
        return true;
    else {
      //  self.mgGroups.select(self.dsGroups.)
        return false;
    }
}//GEN-LAST:event_dsGroupsWillScroll

function formWindowClosed(evt) {//GEN-FIRST:event_formWindowClosed
    mainForm.fmGroups = null
}//GEN-LAST:event_formWindowClosed

}