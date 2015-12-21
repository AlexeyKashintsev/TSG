/**
 * 
 * @author Алексей
 */
function repAllFlatsSaldo() {
    var self = this, model = this.model;
    
    self.setParams = function(aGroupId, aDateId, anAccountId) {
        model.qLcFlatAndSaldo4Report.params.group_id = aGroupId;
        model.qLcFlatAndSaldo4Report.params.date_id = aDateId;
        model.qLcFlatAndSaldo4Report.params.account_id = anAccountId;
    };
    
    /**
     * Report's before render event handler.
     * @param evt Event object.
     */
    function onBeforeRender(evt){//GEN-FIRST:event_onBeforeRender
        model.qLcFlatAndSaldo4Report.requery();
        self.sal = [];
        model.qLcFlatAndSaldo4Report.forEach(function(curs) {
            self.sal.push(curs);
        });
    }//GEN-LAST:event_onBeforeRender
    
}
