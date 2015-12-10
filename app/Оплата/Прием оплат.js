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
    };

    function refresh() {
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
    }

    self.newOplata = function(aSession, aDate, aFlatId, aFlatNum, aGroupId, aSum) {
        refresh();
        model.params.parDateID = aDate;
        model.params.parSessionID = aSession;
        model.params.parFlatID = aFlatId;
        model.params.parGroupID = aGroupId;
        model.params.parFullPay = aSum;
        model.params.parPercent = 0;
        if (aFlatNum){
            model.params.tfFlatNumber.text = aFlatNum;
            model.params.params.barCode = true;
        };
        model.requery();
    };
    
    self.openOplata = function(PayID) {
        model.params.parDateID = self.parDateID;
        model.params.parEditDate = self.parEditDate;
        model.params.parPaymentID = PayID;
        model.requery();
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
    if (self.parFlatID&&self.parDateID&&(model.params.parSum !== 0 || model.params.parFullPay !== 0))
        modSal.addOplata(self.parFlatID, self.parSessionID, self.parDateID,
                         self.parSum, self.parDate, self.parComment, self.parPercent, self.parFullPay);
    model.save();
    refresh();
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
        if (evt.propertyName == 'parFullPay' || evt.propertyName == 'parPercent') {
            var c = model.params;
            c.parSum = c.parFullPay - (!!(+c.parPercent) ? +(c.parPercent * c.parFullPay / 100) : 0);
        }
//        if(evt.propertyName == 'parFullPay'){
//            self.modelFormattedField4.value = evt.newValue / (1 + model.params.parPercent/100); 
//        };
//        if(evt.propertyName == 'parPercent'){
//            self.modelFormattedField4.value = self.modelFormattedField1.value / (1 + model.params.parPercent/100);
//        };
    }//GEN-LAST:event_paramsOnChanged
}
