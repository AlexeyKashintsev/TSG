/**
 * 
 * @author Alexey
 * @name opl_get
 */
function opl_get(aParent) {
    var self = this, model = self.model;
    self.parentForm = null;
    var modSal = new SaldoAndSumsModule();
    

self.syncParams = function(aDate, anIsEditable, anAccount) {
    model.params.parAccountID = anAccount;    
    //model.params.parDateID = aDate;
    //model.params.parAccountID = anAccount;
};

function tfFlatNumberActionPerformed(evt) {//GEN-FIRST:event_tfFlatNumberActionPerformed
    var flat = self.dsFlatsByGroup.find(self.dsFlatsByGroup.schema.lc_flatnumber, self.tfFlatNumber.text);
    if (flat.length == 1){
        model.params.parFlatID = flat[0].lc_flat_id;
    }
}//GEN-LAST:event_tfFlatNumberActionPerformed

function btFlatNumEnterMouseClicked(evt) {//GEN-FIRST:event_btFlatNumEnterMouseClicked
    tfFlatNumberActionPerformed(evt);
}//GEN-LAST:event_btFlatNumEnterMouseClicked

function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
    var tStart = new Date();
    if (self.parFlatID&&self.parDateID&&(model.params.parSum !== 0 || model.params.parFullPay !== 0))
        modSal.addOplata(self.parFlatID, self.parSessionID, self.parDateID,
                         self.parSum, self.parDate, self.parComment, self.parPercent, self.parFullPay);
    model.save();
    var tSave = new Date();
    self.parFlatID = null;
    self.parSum = 0;
    self.parPercent = 0;
    self.parFullPay = 0;
    self.tfFlatNumber.text = '';
    if (self.parentForm)
        (function() {
            self.parentForm.updateSession();
        }).invokeBackground();
    if (self.barCode === true) {
        self.barCode = false;
        self.close();
    };
    var tClose = new Date();
    Logger.info('Save time: ' + (tSave - tStart) + ', Close time: ' + (tClose - tSave));
}//GEN-LAST:event_buttonActionPerformed

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
        //formWindowClosed();
        self.close();
}//GEN-LAST:event_button1ActionPerformed
paramSynchronizer.addListener(this);

    function btFlatNumEnterActionPerformed(evt) {//GEN-FIRST:event_btFlatNumEnterActionPerformed
        // TODO Добавьте свой код:
    }//GEN-LAST:event_btFlatNumEnterActionPerformed

    function formWindowClosed(evt) {//GEN-FIRST:event_formWindowClosed
        if (aParent) {
            aParent.toFront();
            aParent.textBarCode.focus();
        }
    }//GEN-LAST:event_formWindowClosed
  
    function paramsOnChanged(evt) {//GEN-FIRST:event_paramsOnChanged
        if(evt.propertyName == 'parFullPay'){
            self.modelFormattedField4.value = evt.newValue / (1 + model.params.parPercent/100); 
        };
        if(evt.propertyName == 'parPercent'){
            self.modelFormattedField4.value = self.modelFormattedField1.value / (1 + model.params.parPercent/100);
        };
    }//GEN-LAST:event_paramsOnChanged
}
