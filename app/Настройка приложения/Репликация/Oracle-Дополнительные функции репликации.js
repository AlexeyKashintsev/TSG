/**
 * 
 * @name Дополнительные_функции_репликации_для_Oracle
 * @author vy
 */
function Дополнительные_функции_репликации_для_Oracle() {
    var self = this;
    
    // TODO : place your code here

    function btnRefreshStateActionPerformed(evt) {//GEN-FIRST:event_btnRefreshStateActionPerformed
        self.model.dsState.requery();
    }//GEN-LAST:event_btnRefreshStateActionPerformed

    function btnRefreshTablesActionPerformed(evt) {//GEN-FIRST:event_btnRefreshTablesActionPerformed
        self.model.dsTables.requery();
    }//GEN-LAST:event_btnRefreshTablesActionPerformed
}
