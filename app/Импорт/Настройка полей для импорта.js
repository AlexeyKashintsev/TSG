/**
 *
 * @name impFields
 * @author ak
 * @public
 */

function impFields() {


var self = this;

var saveMessage = 'Данные изменены. Сохранить изменения?';
var requeryMessage = 'Изменения данных будут утеряны, продолжить?'
var okFieldMessage = 'Поля указаны правильно';

var isEditable = true;
var isSelectForm = false;
var canSetEdit = true;

var fmParSel = null;
var fmFieldType = null;

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    
}//GEN-LAST:event_formWindowOpened

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if(self.model.modified && confirm(saveMessage, self.title))
        self.model.save();	// TODO Добавьте свой код:
}//GEN-LAST:event_formWindowClosing

function btnRefreshActionPerformed(evt) {//GEN-FIRST:event_btnRefreshActionPerformed
    if(self.model.modified&&confirm(requeryMessage, self.title)||!self.model.modified)
    {   
        self.model.requery();
        setSaveBtnEnabled();
    }
}//GEN-LAST:event_btnRefreshActionPerformed
  
function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    self.model.save();
}//GEN-LAST:event_btnSaveActionPerformed

function btnSelectActionPerformed(evt) {//GEN-FIRST:event_btnSelectActionPerformed
    self.close(self.parImport);
}//GEN-LAST:event_btnSelectActionPerformed

function btnCloseActionPerformed(evt) {//GEN-FIRST:event_btnCloseActionPerformed
    self.close();
}//GEN-LAST:event_btnCloseActionPerformed

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    dsImportVar4Change.insert();
    dsImportVar4Change.importfiletype = 0;
    self.parImport = dsImportVar4Change.importnames_id;
    setSaveBtnEnabled();
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    if (!dsImportVar4Change.empty&&confirm('Удалить текущий тип импорта?')){
        dsImportVar4Change.deleteRow();
        dsImportVars4Select.scrollTo(dsImportVars4Select.findById(self.parImport));
        dsImportVars4Select.deleteRow();
        self.dsExFields.deleteAll();
        self.parImport = null;
    }
    setSaveBtnEnabled();
}//GEN-LAST:event_btnDelActionPerformed

function btnAdd1ActionPerformed(evt) {//GEN-FIRST:event_btnAdd1ActionPerformed
	// TODO Добавьте свой код:
}//GEN-LAST:event_btnAdd1ActionPerformed

function btnDublicateActionPerformed(evt) {//GEN-FIRST:event_btnDublicateActionPerformed
    if(!self.model.modified){
        //self.model.save();
        self.dsImportVariants.insert(self.dsImportVariants.schema.importname,
            'Копия ' + self.dsImportVariants.findById(self.parImport).importname);
        var pImp = self.dsImportVariants.importnames_id;
        self.dsExFields.first();
        while (!self.dsExFields.eof()){
            self.dsEX.insert(   self.dsEX.schema.cellnumber, self.dsExFields.cellnumber,
                                self.dsEX.schema.impfieldtype, self.dsExFields.impfieldtype,
                                self.dsEX.schema.impfieldnumber, self.dsExFields.impfieldnumber,
                                self.dsEX.schema.impfile, pImp,
                                self.dsEX.schema.charid, self.dsExFields.charid,
                                self.dsEX.schema.serviceid, self.dsExFields.serviceid,
                                self.dsEX.schema.statpar, self.dsExFields.statpar);
            self.dsExFields.next();
        }
        self.model.save();
        self.model.requery();
        self.parImport = pImp;
    } else alert('Save first!');            
}//GEN-LAST:event_btnDublicateActionPerformed

//выбор параметра статистики на первой закладке
function jButton1ActionPerformed(evt) {//GEN-FIRST:event_jButton1ActionPerformed
    if (!self.dsExFields.empty)
        self.dsExFields.deleteRow();
    setSaveBtnEnabled();
}//GEN-LAST:event_jButton1ActionPerformed

function jButtonActionPerformed(evt) {//GEN-FIRST:event_jButtonActionPerformed
    if (self.parImport!=null)
        self.dsExFields.insert(self.dsExFields.schema.impfile, self.parImport);
    setSaveBtnEnabled();
}//GEN-LAST:event_jButtonActionPerformed

//выбор параметра старистики на второй закладке

    function colGroupOnSelect(aEditor) {//GEN-FIRST:event_colGroupOnSelect
        var grp = new Form('formGroups');
        grp.showModal(function(aResult){
            return aResult;
        });
    }//GEN-LAST:event_colGroupOnSelect
}