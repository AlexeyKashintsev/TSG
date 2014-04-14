/**
 * 
 * @author Alexey
 * @name opl_get
 */
function opl_get() {
    var self = this;
    self.parentForm = null;
    var modSal = new SaldoAndSumsModule();
    

function tfFlatNumberActionPerformed(evt) {//GEN-FIRST:event_tfFlatNumberActionPerformed
    var flat = self.dsFlatsByGroup.find(self.dsFlatsByGroup.md.lc_flatnumber, self.tfFlatNumber.text);
    if (flat.length == 1){
        self.parFlatID = flat[0].lc_flat_id;
    }
}//GEN-LAST:event_tfFlatNumberActionPerformed

function btFlatNumEnterMouseClicked(evt) {//GEN-FIRST:event_btFlatNumEnterMouseClicked
    tfFlatNumberActionPerformed(evt);
}//GEN-LAST:event_btFlatNumEnterMouseClicked

function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
    if (self.parFlatID&&self.parDateID)
        modSal.addOplata(self.parFlatID, self.parSessionID, self.parDateID,
                         self.parSum, self.parDate, self.parComment);
    self.model.save();
    self.parFlatID = null;
    self.parSum = 0;
    self.tfFlatNumber.text = '';
    if (self.parentForm)
        self.parentForm.updateSession();
}//GEN-LAST:event_buttonActionPerformed

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
    self.close();
}//GEN-LAST:event_button1ActionPerformed

}