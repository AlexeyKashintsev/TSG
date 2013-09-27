/**
 * 
 * @author Алексей
 * @name Импорт_из_фалов_1
 */

var IMPORT_MODULE = "Импорт";
var FORM_IMP_FIELDS_CUST = "impFields";
var FILE_CHOOSER = javax.swing.JFileChooser,
    selectionMode = javax.swing.JFileChooser.FILES_AND_DIRECTORIES;

var impmod = null;
var fmImpFC = null;
var questionsForm = null;
var fmSelStatInpType = null;
var adrfm = null;
var selectedFile = null;
var errorFile = null;

function setSaveBtnEnabled(){
    btnSave1.enabled = btnSave11.enabled = model.modified;
}

function checkImportReadiness(){
    buttonStartImport.enabled = (selectedFile!=null&&parParentAddress!=null&&parImport!=null
        &&(dsImportVariants4Change.importfiletype==1||parStatInputType!=null));
}

function selectStatPar(){
    if (questionsForm==null) questionsForm = new Form(QUESTION_FORM);
    questionsForm.isSelectForm = true;
    return questionsForm.showModal(function(aValue){ 
                return aValue;
            });
}

function statparSelectValue(aEditor) {//GEN-FIRST:event_statparSelectValue
    var stp = selectStatPar();
    if (stp!=null) aEditor.value = stp;
    setSaveBtnEnabled()
}//GEN-LAST:event_statparSelectValue

function button2ActionPerformed(evt) {//GEN-FIRST:event_button2ActionPerformed
    if (fmImpFC==null) fmImpFC = new Form(FORM_IMP_FIELDS_CUST);
    fmImpFC.isSelectForm = true;
    fmImpFC.parImport = parImport;
    fmImpFC.showModal(function(aValue){
        dsImportVariants4select.requery();
        dsImportVariants4Change.requery();
        if (aValue != null)
            parImport = aValue;
    });
}//GEN-LAST:event_button2ActionPerformed

function dbcImportTypeSelectValue(aEditor) {//GEN-FIRST:event_dbcImportTypeSelectValue
    if (fmImpFC==null) fmImpFC = new Form(FORM_IMP_FIELDS_CUST);
    fmImpFC.isSelectForm = true;
    fmImpFC.parImport = parImport;
    fmImpFC.showModal(function(aValue){
        dsImportVariants4select.requery();
        dsImportVariants4Change.requery();
        if (aValue != null)
            aEditor.value = aValue;
    });
}//GEN-LAST:event_dbcImportTypeSelectValue

function rowChanged(aField, aOldValue, aNewValue, aRow) {//GEN-FIRST:event_rowChanged
    checkImportReadiness();
}//GEN-LAST:event_rowChanged

function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
    var chooser = new FILE_CHOOSER();
    chooser.setFileSelectionMode(selectionMode);
    var result = chooser.showOpenDialog(null);
    if (result == FILE_CHOOSER.APPROVE_OPTION) {
        selectedFile = chooser.getSelectedFile();
        textFieldFilePath.text = selectedFile.path;
        var files = new java.io.File(selectedFile).list();
        if (selectedFile.isDirectory()){         
            lblFileAmount.text = files.length;
        }else{
            lblFileAmount.text = '1';
        }
    }
    checkImportReadiness();
}//GEN-LAST:event_buttonActionPerformed

function buttonStartImportActionPerformed(evt) {//GEN-FIRST:event_buttonStartImportActionPerformed
/*
 *Параметры для Импорта
 *<parImport, parParentAddress, parStatInputType, selectedFile>
 *
 **/
    jTabbedPane.selectedIndex = 1;
    if (impmod==null) impmod = new Module(IMPORT_MODULE);
    (function (){
        impmod.stop = false;
        var er = impmod.initializeImport(parImport, parParentAddress,
                parStatInputType, parStatus, selectedFile, LogOutText,
                jProgressBar, labelFileCounter, errorFile);
        if (er!=null)
            alert(er, er=="ok"?"Импорт завершен":"Ошибка импорта")
    }).invokeBackground();
}//GEN-LAST:event_buttonStartImportActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    
}//GEN-LAST:event_formWindowOpened

function button4ActionPerformed(evt) {//GEN-FIRST:event_button4ActionPerformed
    impmod.showDebugLog = !impmod.showDebugLog;
}//GEN-LAST:event_button4ActionPerformed

function button5ActionPerformed(evt) {//GEN-FIRST:event_button5ActionPerformed
    if (confirm('Остановить импорт?'))
        {
            impmod.stop = true;
        }        
}//GEN-LAST:event_button5ActionPerformed

function jButtonActionPerformed(evt) {//GEN-FIRST:event_jButtonActionPerformed
    if (adrfm==null) adrfm = new Form(FORM_ADDRESS_SELECT);
    checkImportReadiness();
}//GEN-LAST:event_jButtonActionPerformed
