/**
 * 
 * @name Audit
 * @author Алексей
 */
function Audit() {
    var self = this, model = this.model, form = this;
    var modCalc = new ServerModule('Calculations');
    var clientProgress = new ProgressShow();

    function finishWork() {
        model.qAudErrors.push(modCalc.getErrors());
        if (model.params.end_date && model.qAudDates.cursor.per_date_id !== model.params.end_date) {
            model.qAudDates.next();
            doAudit(model.qAudDates.cursor.per_date_id);
        }
    }
    
    function doAudit(aDate) {
        clientProgress.enqueServerProcess(function() {
            modCalc.doAudit(model.params.par_group, null, aDate);
        }, finishWork);
    }
    
    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        model.qAudDates.scrollTo(model.qAudDates.findById(model.params.start_date));
        doAudit(model.qAudDates.cursor.per_date_id);
    }//GEN-LAST:event_buttonActionPerformed

    function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
        model.revert();
    }//GEN-LAST:event_button1ActionPerformed
}
