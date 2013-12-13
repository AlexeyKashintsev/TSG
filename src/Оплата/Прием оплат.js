/**
 * 
 * @author Alexey
 */
function opl_get() {
    var self = this;
    
    // TODO : place your code here

    function btnNewSessionActionPerformed(evt) {//GEN-FIRST:event_btnNewSessionActionPerformed
        self.dsOplSessions.insert(self.dsOplSessions.md.date_id, self.parDateID,
                                  self.dsOplSessions.md.opl_date,  new Date());
        self.model.save();
    }//GEN-LAST:event_btnNewSessionActionPerformed
}
