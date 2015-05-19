/**
 * 
 * @name CheckViewsView
 * @author Andrew
 * @rolesAllowed admin
 */
function CheckViewsView() {
    var self = this, model = this.model, form = this;
    
    function btnRefreshActionPerformed(evt) {//GEN-FIRST:event_btnRefreshActionPerformed
        model.dsViewsState.requery();
    }//GEN-LAST:event_btnRefreshActionPerformed

    function btnCloseActionPerformed(evt) {//GEN-FIRST:event_btnCloseActionPerformed
        self.close();
    }//GEN-LAST:event_btnCloseActionPerformed
}
