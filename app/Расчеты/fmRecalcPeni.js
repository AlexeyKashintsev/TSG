/**
 * 
 * @name fmRecalcPeni
 * @author Алексей
 */
function fmRecalcPeni() {
    var self = this, model = this.model, form = this;
    
    var recalcModule = new RecalcModule();
    var clientProgress = new ProgressShow();
    

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        if (model.params.account_id && model.params.date_id && model.params.group_id)
            if (model.params.lc_id)
                recalcModule.recalcPeni(model.params.account_id, model.params.lc_id, model.params.date_id);
            else {
                clientProgress.executeServerProcess(function() {
                    model.flats_by_group.beforeFirst();
                    serverProgress.setMax(model.flats_by_group.length);
                    serverProgress.setValue(0);
                    while (model.flats_by_group.next()) {
                        serverProgress.increaseValue();
                        try {
                            recalcModule.recalcPeni(model.params.account_id, model.flats_by_group.cursor.lc_flat_id, model.params.date_id);     
                        } catch(e) {
                            Logger.warning(e);
                        }
                    }
                    serverProgress.finish();
                });
            }
        else
            alert('Не заданы все параметры!');
    }//GEN-LAST:event_buttonActionPerformed
}