/**
 * 
 * @author Alexey
 * @name opl_get
 */
function opl_view(aParent) {
    var self = this, model = self.model;
    self.parentForm = null;
    var modSal = new SaldoAndSumsModule();
    
    function requery(){
        self.dsOplById.requery();
        var editable = self.dsOplById.date_id==self.model.params.parDateID;
        self.btnSave.visible = self.btnDelete.visible = !!self.model.params.parEditDate;
        self.model.requery();
    };
    
    self.openOplata = function(aDateId, aDateIsEditable, aPayID) {
        model.params.parDateID = aDateId;
        model.params.parEditDate = aDateIsEditable;
        model.params.parPaymentID = aPayID;
        requery();
        model.dsOplById.length;
    };
    

self.syncParams = function(aDate, anIsEditable, anAccount) {
    model.params.parAccountID = anAccount;    
    //model.params.parDateID = aDate;
    //model.params.parAccountID = anAccount;
};


function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
 /*   if (self.parFlatID&&self.parDateID&&self.parSum)
        modSal.addOplata(self.parFlatID, self.parSessionID, self.parDateID,
                         self.parSum, self.parDate, self.parComment);
    self.model.save();
    self.parFlatID = null;
    self.parSum = 0;
    self.tfFlatNumber.text = '';*/
    model.save();
    if (self.parentForm)
        self.parentForm.updateSession();
    self.close();
}//GEN-LAST:event_btnSaveActionPerformed

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
    /*self.close(function(){
        alert('a');
    });
    if (aParent)
        aParent.toFront();*/
        formWindowClosed();
        self.close();
}//GEN-LAST:event_button1ActionPerformed


    function btnDeleteActionPerformed(evt) {//GEN-FIRST:event_btnDeleteActionPerformed
        self.dsOplById.deleteRow();
        self.model.save();
        if (self.parentForm)
            self.parentForm.updateSession();  
        self.close();
    }//GEN-LAST:event_btnDeleteActionPerformed

    function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
        //self.requery();
    }//GEN-LAST:event_formWindowOpened
paramSynchronizer.addListener(this);

    function formWindowClosed(evt) {//GEN-FIRST:event_formWindowClosed
        if (aParent) {
            aParent.toFront();
            aParent.textBarCode.focus();
        }
    }//GEN-LAST:event_formWindowClosed

    function dsOplByIdOnChanged(evt) {//GEN-FIRST:event_dsOplByIdOnChanged
        if (evt.propertyName == 'full_payment' || evt.propertyName == 'bank_percent') {
            var c = model.dsOplById.cursor;
            c.payment_sum = c.full_payment - (!!(+c.bank_percent) ? +(c.bank_percent * c.full_payment / 100) : 0);
        }
//        if(evt.propertyName == 'full_payment'){
//            self.mffPayCalc.value = evt.newValue / (1 + self.mffBankPercent.value/100); 
//        };
//        if(evt.propertyName == 'bank_percent'){
//            self.mffPayCalc.value = self.mffPayFull.value / (1 + evt.newValue/100);
//        };
    }//GEN-LAST:event_dsOplByIdOnChanged
}