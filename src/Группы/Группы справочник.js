/**
 * 
 * @author Алексей
 * @name formGroups
 * @public
 */

function formGroups() {


var self = this;


var parentForm = null;
var toolBarVisible = true;
var isSelectForm = false;
var isEditable = true;
var canSetEdit = false;

function processVisible(){
    self.toolBar.visible = toolBarVisible;
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
    if (!parentForm||(parentForm.check4Modifications()))
        return true;
    else return false;
}//GEN-LAST:event_dsGroupsWillScroll

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    processVisible();
}//GEN-LAST:event_formWindowOpened

function dsGroupsOnScrolled(evt) {//GEN-FIRST:event_dsGroupsOnScrolled
    if (parentForm)
        parentForm.setGroup(self.dsGroups.grp_groups_id);
}//GEN-LAST:event_dsGroupsOnScrolled

}