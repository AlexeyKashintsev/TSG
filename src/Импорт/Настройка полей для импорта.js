/**
 *
 * @name impFields
 * @author ak
 */
/*
 * Типы адресных объектов.js
 *
 * Created on 19.10.2011, 11:00:50
 */
var FORM_SELECT_STAT_PAR = "131909382512836";
var FORM_FIELD_TYPE = "a135247449310218";

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
    if(model.modified && confirm(saveMessage, title))
        model.save();	// TODO Добавьте свой код:
}//GEN-LAST:event_formWindowClosing

function btnRefreshActionPerformed(evt) {//GEN-FIRST:event_btnRefreshActionPerformed
    if(model.modified&&confirm(requeryMessage, title)||!model.modified)
    {   
        model.requery();
        setSaveBtnEnabled();
    }
}//GEN-LAST:event_btnRefreshActionPerformed
  
function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed

}//GEN-LAST:event_btnSaveActionPerformed

function btnSelectActionPerformed(evt) {//GEN-FIRST:event_btnSelectActionPerformed
    close(parImport);
}//GEN-LAST:event_btnSelectActionPerformed

function btnCloseActionPerformed(evt) {//GEN-FIRST:event_btnCloseActionPerformed
    close();
}//GEN-LAST:event_btnCloseActionPerformed

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    dsImportVar4Change.insert();
    dsImportVar4Change.importfiletype = 0;
    parImport = dsImportVar4Change.importnames_id;
    setSaveBtnEnabled();
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    if (!dsImportVar4Change.empty&&confirm('Удалить текущий тип импорта?')){
        dsImportVar4Change.deleteRow();
        dsImportVars4Select.scrollTo(dsImportVars4Select.findById(parImport));
        dsImportVars4Select.deleteRow();
        dsExFields.deleteAll();
        parImport = null;
    }
    setSaveBtnEnabled();
}//GEN-LAST:event_btnDelActionPerformed

function btnAdd1ActionPerformed(evt) {//GEN-FIRST:event_btnAdd1ActionPerformed
	// TODO Добавьте свой код:
}//GEN-LAST:event_btnAdd1ActionPerformed

function btnDublicateActionPerformed(evt) {//GEN-FIRST:event_btnDublicateActionPerformed
    if((model.modified && confirm(saveMessage, title))||!model.modified){
        model.save();
        dsImportVars4Select.insert( dsImportVars4Select.md.importname, 'Копия '+dsImportVar4Change.importname,
                                    dsImportVars4Select.md.importfiletype, dsImportVar4Change.importfiletype);
        var pImp = dsImportVars4Select.importnames_id;
        dsExFields.first();
        while (!dsExFields.eof()){
            dsExF.insert(   dsExF.md.cellnumber, dsExFields.cellnumber,
                            dsExF.md.impfieldtype, dsExFields.impfieldtype,
                            dsExF.md.impfieldnumber, dsExFields.impfieldnumber,
                            dsExF.md.impfile, pImp,
                            dsExF.md.statpar, dsExFields.statpar
                           // dsExF.md.unionwithprev, null
                        )
            dsExFields.next();
        }
        model.save();
        model.requery();
        parImport = pImp;
    }            
}//GEN-LAST:event_btnDublicateActionPerformed

//выбор параметра статистики на первой закладке
function impfieldtypeSelectValue(aEditor) {//GEN-FIRST:event_impfieldtypeSelectValue
    
    if (parImport!=null&&dsImportVar4Change.importfiletype != 0){
        if (fmFieldType==null) fmFieldType = new Form(FORM_FIELD_TYPE);
        fmFieldType.isSelectForm = true;
        fmFieldType.parImportType = dsImportVar4Change.importfiletype;
        fmFieldType.showModal(function(aValue){ 
            if (aValue != null&&aValue != undefined){  
                if(aValue == 302) return; //не пропускаем автоматически добавляемые параметры                
                dsExFields.statpar = null;
                aEditor.value = aValue;
            }
        });        
    }
    else alert('Не выбран тип импорта!')
    setSaveBtnEnabled();
}//GEN-LAST:event_impfieldtypeSelectValue

function jButton1ActionPerformed(evt) {//GEN-FIRST:event_jButton1ActionPerformed
    if (!dsExFields.empty)
        dsExFields.deleteRow();
    setSaveBtnEnabled();
}//GEN-LAST:event_jButton1ActionPerformed

function jButtonActionPerformed(evt) {//GEN-FIRST:event_jButtonActionPerformed
    if (parImport!=null&&dsImportVar4Change.importfiletype != 0){
        if (fmFieldType==null) fmFieldType = new Form(FORM_FIELD_TYPE);
        fmFieldType.isSelectForm = true;
        fmFieldType.parImportType = dsImportVar4Change.importfiletype;
        fmFieldType.showModal(function(aValue){ 
            if (aValue != null&&aValue != undefined){
                if(aValue == 302) return; //не пропускаем автоматически добавляемые параметры
                dsExFields.insert(dsExFields.md.impfile, parImport, dsExFields.md.impfieldtype, aValue);
            }
        });        
    }
    else alert('Не выбран тип импорта!')
    setSaveBtnEnabled();
}//GEN-LAST:event_jButtonActionPerformed

//выбор параметра старистики на второй закладке
function dsExFieldsChanged(evt) {//GEN-FIRST:event_dsExFieldsChanged
	// TODO Добавьте здесь свой код:       
            setSaveBtnEnabled();               
}//GEN-LAST:event_dsExFieldsChanged
