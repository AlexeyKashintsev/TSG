/**
 * 
 * @author Alexey
 * @name main_form
 * @public
 */

function main_form() {


var self = this;


    guiUtils = new guiModule();
    var fmDateSelect = new fmDateSelector;
    var fmWorksheet = null;
    var fmGroups = null;
    var fmOplSessions = null;
    var fmServices = null;
    var fmGroupSelector = null;
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
    } else self.showFormAsInternal(fmWorksheet);
}//GEN-LAST:event_buttonActionPerformed

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
    if (!fmGroups) {
        fmGroups = new formAllGroups2();
        fmGroups.mainForm = mf;
        self.showFormAsInternal(fmGroups);
        self.setDate();
    } else self.showFormAsInternal(fmGroups);
}//GEN-LAST:event_button1ActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    self.all_dates.last();
    self.parDateID = self.all_dates.per_date_id;
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
    if (ok&&fmGroups) ok = fmGroups.setDate(aNewDateID);
    if (ok&&fmOplSessions) ok = fmOplSessions.setDate(aNewDateID);
    if (ok) self.parDateID = aNewDateID;
    return ok;
};

    function button4ActionPerformed(evt) {//GEN-FIRST:event_button4ActionPerformed
        if(!fmGroupSelector){
            fmGroupSelector = new formGroups();
            fmGroupSelector.selector = true;
        }
        fmGroupSelector.showModal(function(aGroup){
        self.flats_by_group.params.group_id = aGroup;
        self.flats_by_group.requery(function(){
                self.flats_by_group.beforeFirst();
            });
        });
    }//GEN-LAST:event_button4ActionPerformed

    function flats_by_groupOnScrolled(evt) {//GEN-FIRST:event_flats_by_groupOnScrolled
        if (self.flats_by_group.next()){
            var repBill = new aaa_1();
            repBill.model.params.parDateID = self.parDateID;
            repBill.model.params.parFlatID = self.flats_by_group.lc_flat_id;//aGroup;
            repBill.print();
        }
    }//GEN-LAST:event_flats_by_groupOnScrolled
}