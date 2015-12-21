/**
 * 
 * @author Alexey
 */
function fmDetailInfoByGroup() {
    var self = this, model = this.model, form = this;
    
    self.syncParams = function(aDate, anIsEditable, anAccount) {
        model.qLcFlatAndSaldo4Report.params.date_id = model.params.parDateEnd = aDate;
        model.qLcFlatAndSaldo4Report.params.account_id = anAccount;
        model.requery();
    };    
    
    paramSynchronizer.addListener(this);
    

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        var group_id = model.qLcFlatAndSaldo4Report.params.group_id;
        var date_id = model.qLcFlatAndSaldo4Report.params.date_id;
        var account_id = model.qLcFlatAndSaldo4Report.params.account_id;
        var rep = new repAllFlatsSaldo();
        rep.setParams(group_id, date_id, account_id);
        rep.show();
    }//GEN-LAST:event_buttonActionPerformed
}
