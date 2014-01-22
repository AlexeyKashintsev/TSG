/**
 * 
 * @author Alexey
 */
function testFFF() {
    var self = this;
    var sm = new ServerModule('aaa');
    // TODO : place your code here

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        self.dsEntities.insert(self.dsEntities.md.lc_regto, 'aaa');
        sm.addSmth();
    }//GEN-LAST:event_buttonActionPerformed

    function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
        self.model.save();
    }//GEN-LAST:event_button1ActionPerformed

    function button2ActionPerformed(evt) {//GEN-FIRST:event_button2ActionPerformed
        self.model.requery();
    }//GEN-LAST:event_button2ActionPerformed
}
