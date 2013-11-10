/**
 * 
 * @author Alexey
 * @name main_form
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
        setDates();
    }
}//GEN-LAST:event_buttonActionPerformed

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
    if (!fmGroups) {
        fmGroups = new formAllGroups();
        fmGroups.mainForm = mf;
        showFormAsInternal(fmGroups);
        setDates();
    }
}//GEN-LAST:event_button1ActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    all_dates.last();
    parDateID = all_dates.per_date_id;
    fmDateSelect.showOnPanel(pnlDateSelector);
}//GEN-LAST:event_formWindowOpened

function paramsOnChanged(evt) {//GEN-FIRST:event_paramsOnChanged
    setDates();
}//GEN-LAST:event_paramsOnChanged

function textFieldActionPerformed(evt) {//GEN-FIRST:event_textFieldActionPerformed
    textField.text += parDateID;	// TODO Добавьте свой код:
}//GEN-LAST:event_textFieldActionPerformed

function setDate(aNewDateID){
    parentForm.setDate(aNewDateID);
}