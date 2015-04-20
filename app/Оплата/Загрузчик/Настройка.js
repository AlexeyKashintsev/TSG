/**
 * 
 * @name ImportFromFiles
 * @author Алексей
 * @public
 */

function ImportData() {


    var self = this;


    var IMPORT_MODULE = "ImportReadProcessor";
    var FORM_IMP_FIELDS_CUST = "impFields";
    var FILE_CHOOSER = javax.swing.JFileChooser,
        selectionMode = javax.swing.JFileChooser.FILES_AND_DIRECTORIES;

    var impmod = null;
    var fmImpFC = null;
    var questionsForm = null;
    var selectedFile = null;
    var dateId, sessionId;

    function checkImportReadiness(){
        self.buttonStartImport.enabled = (selectedFile!=null);
    }

    self.setParams = function(aSessionId, aDateId) {
        sessionId = aSessionId;
        dateId = aDateId;
    };

function statparSelectValue(aEditor) {//GEN-FIRST:event_statparSelectValue
    var stp = selectStatPar();
    if (stp!=null) aEditor.value = stp;
    setSaveBtnEnabled()
}//GEN-LAST:event_statparSelectValue

function dbcImportTypeSelectValue(aEditor) {//GEN-FIRST:event_dbcImportTypeSelectValue

}//GEN-LAST:event_dbcImportTypeSelectValue

function rowChanged(aField, aOldValue, aNewValue, aRow) {//GEN-FIRST:event_rowChanged
    checkImportReadiness();
}//GEN-LAST:event_rowChanged

function btnSelectFileActionPerformed(evt) {//GEN-FIRST:event_btnSelectFileActionPerformed
    var chooser = new FILE_CHOOSER();
    chooser.setFileSelectionMode(selectionMode);
    var result = chooser.showOpenDialog(null);
    if (result == FILE_CHOOSER.APPROVE_OPTION) {
        selectedFile = chooser.getSelectedFile();
        self.textFieldFilePath.text = selectedFile.path;
        var files = new java.io.File(selectedFile).list();
        if (selectedFile.isDirectory()){         
            self.lblFileAmount.text = files.length;
        }else{
            self.lblFileAmount.text = '1';
        }
    }
    checkImportReadiness();
}//GEN-LAST:event_btnSelectFileActionPerformed

function buttonStartImportActionPerformed(evt) {//GEN-FIRST:event_buttonStartImportActionPerformed
/*
 *Параметры для Импорта
 *<self.parImport, parParentAddress, parStatInputType, selectedFile, parPaymentSession>
 *
 **/
    self.jTabbedPane.selectedIndex = 1;
    if (impmod==null) impmod = new ServerModule(IMPORT_MODULE);
    (function (){
        impmod.stop = false;
        var er = impmod.startImport(selectedFile, self.LogOutText
                                    , self.jProgressBar, self.labelFileCounter
                                    , sessionId, dateId);
        if (er!=null)
            alert(er, er=="ok"?"Импорт завершен":"Ошибка импорта");
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

}