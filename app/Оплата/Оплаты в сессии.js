/**
 * 
 * @author Алексей
 * @name oplInSession
 * @public
 */

function oplInSession() {


var self = this, model = self.model;


var isSelectForm = true;
var isEditable = false;
var canSetEdit = true;
var fmNewOplata = new opl_get(self);
var fmEditOplata = new opl_view(self);
self.parentForm = null;
self.mainForm = null;
var barCodes = {};
var importForm = new ImportData();

function setEdit(){
    self.modelGrid.editable = 
            self.btnDel.enabled = self.btnSave.enabled = isEditable;    
    
}

self.updateSession = function(){
    self.model.requery();
    self.parentForm.updateSession();
};

self.init = function (aSessionID, aDateID,aEditDate){
    self.parDateID = aDateID;
    self.parSessionID = aSessionID;
    self.parEditDate = aEditDate;
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
            self.OpenOlpata(self.dsPaymentsInSession.opl_payments_id);
        }
    }//GEN-LAST:event_modelGridMouseClicked

    self.OpenOlpata = function(PayID){
        fmEditOplata.model.params.parDateID = self.parDateID;
        fmEditOplata.model.params.parEditDate = self.parEditDate;
        fmEditOplata.model.params.parPaymentID = PayID;
        fmEditOplata.parentForm = self;
        fmEditOplata.requery();
        if (self.mainForm)
            self.mainForm.showFormAsInternal(fmEditOplata);
        else
            fmEditOplata.show();
    };

    self.NewOplata = function(group_id, flat_id, lcNum, sum){
        fmNewOplata.parDateID = self.parDateID;
        fmNewOplata.parSessionID = self.parSessionID;
        fmNewOplata.parFlatID = flat_id;
        fmNewOplata.parGroupID = group_id;
        fmNewOplata.parFullPay = sum;
        fmNewOplata.parPercent = 0;
        if(lcNum){
            fmNewOplata.tfFlatNumber.text = lcNum;
            fmNewOplata.params.barCode = true;
        };
        fmNewOplata.model.requery();
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
                    self.OpenOlpata(oplata[0].opl_payments_id);
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