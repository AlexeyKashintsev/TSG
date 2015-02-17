/**
 * 
 * @author Alexey
 * @name main_form
 * @public
 */

function main_form() {


var self = this, model = self;


    guiUtils = new guiModule();
    var fmDateSelect = new fmDateSelector;
    var fmWorksheet = null;
    var fmGroups = null;
    var fmDebt = null;
    var fmOplSessions = null;
    var fmServices = null;
    var fmIssues = null;
    var fmGroupSelector = null;
    var fmReportPrint = new ReportPrint();
    var mf = this;
    
function showFormAsModal(formId)
{
    modalForm = new Form(formId);
    modalForm.showModal();
}

self.showFormAsInternal = function(aForm)
{
   // if (!swapFrames(formId)){
      //  if(!guiUtils.showOpenedForm(aForm, self.formDesktop)){
            var frameRunner = aForm;
            var lenCookie = guiUtils.beginLengthyOperation(this);
            try{
                frameRunner.desktop = self.formDesktop;
                frameRunner.showInternalFrame(self.formDesktop);
               /* var internalFrame = frameRunner.getInternalFrame(self.formDesktop);
                internalFrame.resizable = true;
                internalFrame.maximizable = true;
                internalFrame.closable = true;
                internalFrame.iconifiable = true;*/
              //  guiUtils.putUserFormProperty(internalFrame, formId);
            }finally{
                lenCookie.end();
            }
            frameRunner.toFront();
     //   }
     //   return frameRunner;
}

function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
    if (!fmWorksheet) {
        fmWorksheet = new mainWorkSheet();
        fmWorksheet.mainForm = mf;
        self.showFormAsInternal(fmWorksheet);
        self.setDate();
        self.setAccount();
        self.setEditDate(model.params.parEditDate);
    } else self.showFormAsInternal(fmWorksheet);
}//GEN-LAST:event_buttonActionPerformed

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
    if (!fmDebt) {
        fmDebt = new debt_in_group();
        fmDebt.mainForm = mf;
        self.showFormAsInternal(fmDebt);
        self.setDate();
        self.setAccount();
    } else self.showFormAsInternal(fmDebt);
}//GEN-LAST:event_button1ActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    model.all_dates.last();
    model.params.parDateID = self.all_dates.per_date_id;
    model.params.parEditDate = self.all_dates.edit_date;
    model.params.parAccountID = 142356814258574;
    fmDateSelect.parentForm = mf;
    fmDateSelect.showOnPanel(self.pnlDateSelector);
}//GEN-LAST:event_formWindowOpened

function paramsOnChanged(evt) {//GEN-FIRST:event_paramsOnChanged
    //setDate(self.parDateID);
}//GEN-LAST:event_paramsOnChanged

function button2ActionPerformed(evt) {//GEN-FIRST:event_button2ActionPerformed
    if (!fmOplSessions) {
        fmOplSessions = new opl_session_view();
        fmOplSessions.mainForm = mf;
        self.showFormAsInternal(fmOplSessions);
        self.setDate();
        self.setEditDate(model.params.parEditDate);
        self.setAccount();
    } else self.showFormAsInternal(fmOplSessions);
}//GEN-LAST:event_button2ActionPerformed

function button3ActionPerformed(evt) {//GEN-FIRST:event_button3ActionPerformed
    if (!fmServices) {
        fmServices = new ServicesForm();
        fmServices.mainForm = mf;
        self.showFormAsInternal(fmServices);
       // self.setDate();
    }	else self.showFormAsInternal(fmServices);
}//GEN-LAST:event_button3ActionPerformed

self.setDate = function(aNewDateID){
    if (!aNewDateID) aNewDateID = self.parDateID;
    var ok = true;
    if (ok&&fmWorksheet) ok = fmWorksheet.setDate(aNewDateID);
    if (ok&&fmDebt) ok = fmDebt.setDate(aNewDateID);
    if (ok&&fmOplSessions) ok = fmOplSessions.setDate(aNewDateID);
    if (ok) self.parDateID = aNewDateID;
    return ok;
};

self.setEditDate = function(aEditDate){
    //if (!!aEditDate) aEditDate = self.parEditDate;
    var ok = true;
    if (ok&&fmWorksheet) ok = fmWorksheet.setEditDate(aEditDate);
    //if (ok&&fmGroups) ok = fmGroups.setEditDate(aEditDate);
    if (ok&&fmOplSessions) ok = fmOplSessions.setEditDate(aEditDate);
    return ok;
};

self.setAccount = function(aNewAccount){
    if (!aNewAccount) aNewAccount = self.parAccountID;
    var ok = true;
    if (ok&&fmWorksheet) ok = fmWorksheet.setAccount(aNewAccount);
    if (ok&&fmDebt) ok = fmDebt.setAccount(aNewAccount);
    if (ok&&fmOplSessions) ok = fmOplSessions.setAccount(aNewAccount);
    return ok;
}


    function button4ActionPerformed(evt) {//GEN-FIRST:event_button4ActionPerformed
       fmReportPrint.model.params.parDateID = self.model.params.parDateID;
       self.showFormAsInternal(fmReportPrint);
    }//GEN-LAST:event_button4ActionPerformed

    function flats_by_groupOnScrolled(evt) {//GEN-FIRST:event_flats_by_groupOnScrolled
        /*if (self.flats_by_group.next()){
            var repBill = new aaa_1();
            repBill.model.params.parDateID = self.parDateID;
            repBill.model.params.parFlatID = self.flats_by_group.lc_flat_id;//aGroup;
            repBill.print();
        }*/
    }//GEN-LAST:event_flats_by_groupOnScrolled

    function button5ActionPerformed(evt) {//GEN-FIRST:event_button5ActionPerformed
        fmIssues = new AllIssues();
        fmIssues.mainForm = mf;        
        self.showFormAsInternal(fmIssues);
    }//GEN-LAST:event_button5ActionPerformed

    function modelComboOnRender(evt) {//GEN-FIRST:event_modelComboOnRender
        self.setAccount();
    }//GEN-LAST:event_modelComboOnRender

    function button6ActionPerformed(evt) {//GEN-FIRST:event_button6ActionPerformed
        var fmAccountSel = new formAccountParams();
        fmAccountSel.isSelectForm = true;
        fmAccountSel.mainForm = mf;
        self.showFormAsInternal(fmAccountSel); 
    }//GEN-LAST:event_button6ActionPerformed
}