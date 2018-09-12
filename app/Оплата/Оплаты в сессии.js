/**
 * 
 * @author Алексей
 * @name oplInSession
 * @public
 */

function oplInSession() {


var self = this, model = self.model;
Logger.warning('oplInSession init progress');

var isSelectForm = true;
var isEditable = false;
var canSetEdit = true;
var fmNewOplata = new opl_get(self);
var fmEditOplata = new opl_view(self);
self.parentForm = null;
self.mainForm = null;
var barCodes = {};
var importForm = new ImportData();

    self.model.dsSessionColAndSum.params.sessionid = 0;
    self.model.dsPaymentsInSession.params.sessionid = 0;

function setEdit(){
    self.modelGrid.editable = 
            self.btnDel.enabled = self.btnSave.enabled = isEditable;    
    
}

self.updateSession = function(){
    var sT = new Date();
//    self.model.requery();
    model.dsSessionColAndSum.requery();
    model.dsPaymentsInSession.requery();
    var rT = new Date();
    self.parentForm.updateSession();
    var eT = new Date();
    Logger.warning('1: ' + (rT-sT) + ', 2: ' + (eT - rT));
};

self.init = function (aSessionID, aDateID,aEditDate){
    Logger.warning('Trying to open. Текущая сессия: ' + aSessionID);
    self.model.params.beginUpdate();
    self.parDateID = aDateID;
    self.parSessionID = aSessionID;
    self.parEditDate = aEditDate;
    self.model.params.endUpdate();
    Logger.warning('Текущая сессия: ' + aSessionID);
    self.model.dsSessionColAndSum.params.sessionid = aSessionID;
    self.model.dsPaymentsInSession.params.sessionid = aSessionID;
    model.requery();
};


function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
    self.model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    self.model.save();
}//GEN-LAST:event_btnSaveActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    setEdit();
    self.textBarCode.focus();
}//GEN-LAST:event_formWindowOpened

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (self.model.modified&&confirm('Сохранить изменения?')){
        self.model.save();
    }
}//GEN-LAST:event_formWindowClosing

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    self.NewOplata();
}//GEN-LAST:event_btnAddActionPerformed


    function modelGridMouseClicked(evt) {//GEN-FIRST:event_modelGridMouseClicked
        if (evt.clickCount > 1){
            self.openOplata(self.dsPaymentsInSession.opl_payments_id);
        }
    }//GEN-LAST:event_modelGridMouseClicked

    self.openOplata = function(aPayID){
        fmEditOplata.openOplata(self.parDateID, self.parEditDate, aPayID);
        fmEditOplata.parentForm = self;
//        fmEditOplata.requery();
        if (self.mainForm)
            self.mainForm.showFormAsInternal(fmEditOplata);
        else
            fmEditOplata.show();
    };

    self.NewOplata = function(group_id, flat_id, lcNum, sum){
        fmNewOplata.newOplata(self.parSessionID, self.parDateID, flat_id, lcNum, group_id, sum)
        fmNewOplata.parentForm = self;
        if (self.mainForm)
            self.mainForm.showFormAsInternal(fmNewOplata);
        else
            fmNewOplata.show();
    };
    //TODO Название функции не удачно выбрано
    self.intConcat = function(beg, end){
        var code = model.params.parCode;
        var res = '';
        for (var i = beg; i<end; i++){
            res += code[i];
        }
        return parseInt(res,10);
    }

    self.barCodeConversion = function(){
        model.dsGroupByBarCode.params.grp_id = self.intConcat(4,8);
            model.dsGroupByBarCode.requery();
            model.dsFlatByLcNum.params.lcNum = self.intConcat(8,12).toString();
            model.dsFlatByLcNum.requery();
            var opl = self.intConcat(12,22)/100;
            switch (model.dsPaymentsInSession.find(model.dsPaymentsInSession.schema.lc_flat_id, model.dsFlatByLcNum.lc_flat_id).length){
                case 1: 
                    var oplata = model.dsPaymentsInSession.find(model.dsPaymentsInSession.schema.lc_flat_id, model.dsFlatByLcNum.lc_flat_id);
                    self.openOplata(oplata[0].opl_payments_id);
                    break;
                case 0:
                    self.NewOplata(model.dsFlatByLcNum.group_id, model.dsFlatByLcNum.lc_flat_id, model.dsFlatByLcNum.lc_flatnumber, opl);
                    break;
                default:
                    alert('В данной сессии больше 1 оплаты с этой квартиры');
                    break;                    
            };
            model.params.parCode = null;    
            self.textBarCode.focus();
    };

    function paramsOnChanged(evt) {//GEN-FIRST:event_paramsOnChanged
        if(model.params.parCode != null && model.params.parCode != '' && evt.propertyName == 'parCode'){
            self.barCodeConversion();
        }
    }//GEN-LAST:event_paramsOnChanged

    function btnImportActionPerformed(evt) {//GEN-FIRST:event_btnImportActionPerformed
        importForm.setParams(model.params.parSessionID, model.params.parDateID)
        importForm.showModal(function() {
            model.requery();
        });
    }//GEN-LAST:event_btnImportActionPerformed
}