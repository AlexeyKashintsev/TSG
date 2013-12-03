/**
 * 
 * @author Alexey
 * @name formAllGroups
 * @public
 */

var fmTarif = new fmTarifs();

function check4Modifications(){
    if ((!dsChars.modified&&!dsServices.modified)
            ||askAndSave()){
            //||confirm('Не сохраненные изменения будут утеряны. Продолжить?')){
            return true;
        }
    else return false;
}

function askAndSave(){
    if (confirm('Сохранить изменения')){
        model.save();
        return true;
    } else return false;
}

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    fmTarif.modelCombo.visible = false;
    fmTarif.showOnPanel(pnlTarifs);
}//GEN-LAST:event_formWindowOpened

function button11ActionPerformed(evt) {//GEN-FIRST:event_button11ActionPerformed
    var p = dsGroups.grp_parent;
    dsGroups.insert(dsGroups.md.grp_parent, p);
}//GEN-LAST:event_button11ActionPerformed

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
    var p = dsGroups.grp_groups_id;
    dsGroups.insert(dsGroups.md.grp_parent, p);
}//GEN-LAST:event_button1ActionPerformed

function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
    if (confirm('Удалить текущую группу'))
        dsGroups.delete();
}//GEN-LAST:event_buttonActionPerformed

function button3ActionPerformed(evt) {//GEN-FIRST:event_button3ActionPerformed
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
    model.requery();
}//GEN-LAST:event_button3ActionPerformed

function button2ActionPerformed(evt) {//GEN-FIRST:event_button2ActionPerformed
    model.save();
}//GEN-LAST:event_button2ActionPerformed

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    dsServices.insert(dsServices.md.group_id, dsGroups.grp_groups_id);
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    dsServices.delete();
}//GEN-LAST:event_btnDelActionPerformed

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
    model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function colCalcTypeOnSelect(aEditor) {//GEN-FIRST:event_colCalcTypeOnSelect
    var fmSelectCalcType = new Form('fmCalcType');
    var res = null;
    fmSelectCalcType.isSelectForm = true;
    fmSelectCalcType.showModal(function(aValue){
        dsServices.calc_id = aValue;
    });
}//GEN-LAST:event_colCalcTypeOnSelect

function btnAdd1ActionPerformed(evt) {//GEN-FIRST:event_btnAdd1ActionPerformed
    dsChars.insert(dsChars.md.grp_group_id, dsGroups.grp_groups_id,
                   dsChars.md.add_char_to_lc, true,
                   dsChars.md.char_calc_by_lc, true);
}//GEN-LAST:event_btnAdd1ActionPerformed

function btnDel1ActionPerformed(evt) {//GEN-FIRST:event_btnDel1ActionPerformed
    confirm('Удалить характеристику?')&&dsChars.delete();
}//GEN-LAST:event_btnDel1ActionPerformed

function btnReq1ActionPerformed(evt) {//GEN-FIRST:event_btnReq1ActionPerformed
    if (model.modified()&&confirm('Сохранить изменения?')){
        model.save();
    }
    model.requery();
}//GEN-LAST:event_btnReq1ActionPerformed

function dsGroupsWillScroll(evt) {//GEN-FIRST:event_dsGroupsWillScroll
    if (check4Modifications())
        return true;
    else {
      //  mgGroups.select(dsGroups.)
        return false;
    }
}//GEN-LAST:event_dsGroupsWillScroll

function formWindowClosed(evt) {//GEN-FIRST:event_formWindowClosed
    mainForm.fmGroups = null
}//GEN-LAST:event_formWindowClosed

function button4ActionPerformed(evt) {//GEN-FIRST:event_button4ActionPerformed
   var modCalc = new Calculations();
   var lc = new modCalc.Groups(dsGroups.grp_groups_id, null, 137535124728956);
   var r = new aaa();
    alert(r.b.c);
}//GEN-LAST:event_button4ActionPerformed

function aaa(){
    this['b'] = new bbb();
    function bbb(){
        this.c = 10;
    }
}