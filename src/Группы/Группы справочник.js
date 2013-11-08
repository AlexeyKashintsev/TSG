/**
 * 
 * @author Алексей
 * @name formGroups
 * @public
 */

var parentForm = null;
var toolBarVisible = true;
var isSelectForm = false;
var isEditable = true;
var canSetEdit = false;

function processVisible(){
    toolBar.visible = toolBarVisible;
    !toolBarVisible&&(modelGrid.top=0);
}

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

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
}//GEN-LAST:event_formWindowClosing

function dsGroupsWillScroll(evt) {//GEN-FIRST:event_dsGroupsWillScroll
    if (!parentForm||(parentForm.check4Modifications()))
        return true;
    else return false;
}//GEN-LAST:event_dsGroupsWillScroll

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    processVisible();
}//GEN-LAST:event_formWindowOpened

function dsGroupsOnScrolled(evt) {//GEN-FIRST:event_dsGroupsOnScrolled
    if (parentForm)
        parentForm.setGroup(dsGroups.grp_groups_id);
}//GEN-LAST:event_dsGroupsOnScrolled
