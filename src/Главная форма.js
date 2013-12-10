/**
 * 
 * @author Alexey
 * @name main_form
 * @public
 */

    guiUtils = new guiModule();
    var fmDateSelect = new fmDateSelector;
    var fmWorksheet = null;
    var fmGroups = null;
    var mf = this;
    
function showFormAsModal(formId)
{
    modalForm = new Form(formId);
    modalForm.showModal();
}

function showFormAsInternal(aForm)
{
   // if (!swapFrames(formId)){
      //  if(!guiUtils.showOpenedForm(aForm, formDesktop)){
            var frameRunner = aForm;
            var lenCookie = guiUtils.beginLengthyOperation(this);
            try{
                frameRunner.desktop = formDesktop;
                frameRunner.showInternalFrame(formDesktop);
                var internalFrame = frameRunner.getInternalFrame(formDesktop);
                internalFrame.resizable = true;
                internalFrame.maximizable = true;
                internalFrame.closable = true;
                internalFrame.iconifiable = true;
              //  guiUtils.putUserFormProperty(internalFrame, formId);
            }finally{
                lenCookie.end();
            }
     //   }
     //   return frameRunner;
}

function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
    if (!fmWorksheet) {
        fmWorksheet = new mainWorkSheet();
        fmWorksheet.mainForm = mf;
        showFormAsInternal(fmWorksheet);
        setDate();
    }
}//GEN-LAST:event_buttonActionPerformed

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
    if (!fmGroups) {
        fmGroups = new formAllGroups2();
        fmGroups.mainForm = mf;
        showFormAsInternal(fmGroups);
        setDate();
    }
}//GEN-LAST:event_button1ActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    all_dates.last();
    parDateID = all_dates.per_date_id;
    fmDateSelect.parentForm = mf;
    fmDateSelect.showOnPanel(pnlDateSelector);
}//GEN-LAST:event_formWindowOpened

function paramsOnChanged(evt) {//GEN-FIRST:event_paramsOnChanged
    //setDate(parDateID);
}//GEN-LAST:event_paramsOnChanged

function setDate(aNewDateID){
    if (!aNewDateID) aNewDateID = parDateID;
    var ok = true;
    if (fmWorksheet) ok = fmWorksheet.setDate(aNewDateID);
    if (fmGroups) ok = fmGroups.setDate(aNewDateID);
    if (ok) parDateID = aNewDateID;
    return ok;
}