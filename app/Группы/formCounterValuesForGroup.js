/**
 * 
 * @name formCounterValuesForGroup
 * @author TSG
 */
function formCounterValuesForGroup() {
    var self = this, model = this.model, form = this;
    
    paramSynchronizer.addListener(this);

    function btnReportActionPerformed(evt) {//GEN-FIRST:event_btnReportActionPerformed
        var repBill = new billsCounterValuesForGroup(); 
        repBill.setParams(model.params.parDateID, model.params.parGroupID, 
                          model.params.parAccountID, model.params.parServiceID);
        repBill.show();
    }//GEN-LAST:event_btnReportActionPerformed

    function dsCounterWithAskforvalueOnRequeried(evt) {//GEN-FIRST:event_dsCounterWithAskforvalueOnRequeried
        if(model.dsCounterWithAskforvalue.length !== 0)
            model.params.parServiceID = model.dsCounterWithAskforvalue[0].services_id;
    }//GEN-LAST:event_dsCounterWithAskforvalueOnRequeried
}
