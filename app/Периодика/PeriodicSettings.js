/**
 * 
 * @name PeriodicSettings
 * @author Alexey
 * @public
 */
function PeriodicSettings() {
    var self = this, model = this.model, form = this;
    
    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        model.save(form.close);
    }//GEN-LAST:event_buttonActionPerformed

    function btnAddPeriodActionPerformed(evt) {//GEN-FIRST:event_btnAddPeriodActionPerformed
        model.qPeniPeriods.push({
            date_id: model.params.DateID
        });
    }//GEN-LAST:event_btnAddPeriodActionPerformed

    function btnDelPeriodActionPerformed(evt) {//GEN-FIRST:event_btnDelPeriodActionPerformed
        model.qPeniPeriods.deleteRow();
    }//GEN-LAST:event_btnDelPeriodActionPerformed
}
