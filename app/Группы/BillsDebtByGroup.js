/**
 * 
 * @author TSG
 */
function BillsDebtByGroup(aReportObject) {
    var self = this, model = this.model;
    self.RD = {};
    /**
     * Report's before render event handler.
     * @param evt Event object.
     */
    function onBeforeRender(evt){//GEN-FIRST:event_onBeforeRender
        self.RD = aReportObject;      
    }//GEN-LAST:event_onBeforeRender
    
}
