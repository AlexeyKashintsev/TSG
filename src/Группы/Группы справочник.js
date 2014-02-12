/**
 * 
 * @author Алексей
 * @name formGroups
 * @public
 */

function formGroups() {


var self = this;


self.parentForm = null;
self.toolBarVisible = true;
self.selector = false;

function processVisible(){
    self.toolBar.visible = self.toolBarVisible;
    self.pnlSelect.visible = self.selector;
   // !toolBarVisible&&(self.modelGrid.top=0);
}

function button11ActionPerformed(evt) {//GEN-FIRST:event_button11ActionPerformed
    var p = self.dsGroups.grp_parent;
    self.dsGroups.insert(self.dsGroups.md.grp_parent, p);
}//GEN-LAST:event_button11ActionPerformed

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
    var p = self.dsGroups.grp_groups_id;
    self.dsGroups.insert(self.dsGroups.md.grp_parent, p);
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

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
}//GEN-LAST:event_formWindowClosing

function dsGroupsWillScroll(evt) {//GEN-FIRST:event_dsGroupsWillScroll
    if (!self.parentForm||(self.parentForm.check4Modifications()))
        return true;
    else return false;
}//GEN-LAST:event_dsGroupsWillScroll

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    processVisible();
}//GEN-LAST:event_formWindowOpened

function dsGroupsOnScrolled(evt) {//GEN-FIRST:event_dsGroupsOnScrolled
    if (self.parentForm)
        self.parentForm.setGroup(self.dsGroups.grp_groups_id);
}//GEN-LAST:event_dsGroupsOnScrolled


    function btnSelectActionPerformed(evt) {//GEN-FIRST:event_btnSelectActionPerformed
        self.close(self.dsGroups.grp_groups_id);
    }//GEN-LAST:event_btnSelectActionPerformed
}