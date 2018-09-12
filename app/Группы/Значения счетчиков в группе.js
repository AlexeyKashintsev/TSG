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

    function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
        model.dsCounterWithAskforvalue.params.group_id =
            model.dsCounterValuesForGroup.params.group_id =
            model.qCountersSumsByGroupAndService.params.group_id =
            model.flats_by_group.params.group_id =
            model.params.parGroupID;
        model.requery();
    }//GEN-LAST:event_btnReqActionPerformed
}
