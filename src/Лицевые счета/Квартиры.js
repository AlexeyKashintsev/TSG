/**
 * 
 * @author Alexey
 * @name formFlats
 */

function check4Modifications(){
    if      ((!model.modified)
            ||askAndSave){
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
 
}//GEN-LAST:event_formWindowOpened

function dsGroupsWillScroll(evt) {//GEN-FIRST:event_dsGroupsWillScroll
    return check4Modifications();
}//GEN-LAST:event_dsGroupsWillScroll

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    dsflats_by_group.insert(dsflats_by_group.md.lc_group, parGroup);
}//GEN-LAST:event_btnAddActionPerformed

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
    model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    model.save();
}//GEN-LAST:event_btnSaveActionPerformed

function dsflats_by_groupWillScroll(evt) {//GEN-FIRST:event_dsflats_by_groupWillScroll
    return check4Modifications();
}//GEN-LAST:event_dsflats_by_groupWillScroll
