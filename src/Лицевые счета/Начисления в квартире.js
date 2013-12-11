/**
 * 
 * @author Alexey
 * @name form_sums_per_flat
 * @public
 */

function form_sums_per_flat() {


var self = this;

var modSums = null;
var modCalc = new Calculations();

function initModuleSums(){
    if (!modSums)
        modSums = new SaldoAndSumsModule();
}

function button2ActionPerformed(evt) {//GEN-FIRST:event_button2ActionPerformed
    initModuleSums();
    modSums.initSums(null, self.parFlatID, self.parDateID);
    self.model.requery();
}//GEN-LAST:event_button2ActionPerformed

function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
    modCalc.prepareCalcModule(null, self.parFlatID, self.parDateID);
    modCalc.calculateValues();
}//GEN-LAST:event_buttonActionPerformed

}