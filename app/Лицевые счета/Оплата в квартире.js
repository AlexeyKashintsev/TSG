/**
 * 
 * @author Alexey
 * @name formPaymentsInFlat
 * @public
 */

function formPaymentsInFlat() {
    var self = this, model = self.model;
    var sChoiser = new opl_session_view_choser();
    var oView = new opl_view();
    
    self.setLcId = function(aFlatId) {
        model.params.parFlatID = aFlatId;
    };
    
function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
        if (model.modified && confirm('Сохранить изменения?')) {
            model.save();
        }
        model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
        model.save();
}//GEN-LAST:event_btnSaveActionPerformed

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    var session = sChoiser.showModal();
    if (session) {
        model.qPaymentsInFlat.push({
                flat_id:    model.params.parFlatID,
                session_id: session,
                date_id:    model.params.parDateID
            });
        model.save(function() {
            oView.openOplata(model.params.parDateID, true, model.qPaymentsInFlat.cursor.opl_payments_id);
            oView.showModal();
        });
    }
}//GEN-LAST:event_btnAddActionPerformed
    paramSynchronizer.addListener(this);
}