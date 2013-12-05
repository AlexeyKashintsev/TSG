/**
 * 
 * @author Alexey
 * @name form_sums_per_flat
 * @public
 */
var modSums = null;
var modCalc = new Calculations();

function initModuleSums(){
    if (!modSums)
        modSums = new SaldoAndSumsModule();
}

function button2ActionPerformed(evt) {//GEN-FIRST:event_button2ActionPerformed
    initModuleSums();
    modSums.initSums(null, parFlatID, parDateID);
    model.requery();
}//GEN-LAST:event_button2ActionPerformed

function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
    modCalc.prepareCalcModule(null, parFlatID, parDateID);
    modCalc.calculateValues();
}//GEN-LAST:event_buttonActionPerformed
