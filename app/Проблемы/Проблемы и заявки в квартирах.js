/**
 * 
 * @author TSG
 */
function mainWorkFlat() {
    var self = this, model = this.model, form = this;
    var fmIssue = null;
    var fmApplication = null;
    

    function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
        fmIssue = new AllIssues();
        fmIssue.mainForm = self.mainForm;
        fmIssue.showOnPanel(self.pnlIssue);
        fmApplication = new AllApplications();
        fmApplication.mainForm = self.mainForm;
        fmApplication.showOnPanel(self.pnlAppl);
    }//GEN-LAST:event_formWindowOpened
}
