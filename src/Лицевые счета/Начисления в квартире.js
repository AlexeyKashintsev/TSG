/**
 * 
 * @author Alexey
 * @name form_sums_per_flat
 * @public
 */
var modSums = null;

function initSums(){
    if (!modSums)
        modSums = new moduleSaldoAndSums();
}

function button2ActionPerformed(evt) {//GEN-FIRST:event_button2ActionPerformed
    initSums();
    modSums.initSums(null, parFlatID, parDateID);
    model.requery();
}//GEN-LAST:event_button2ActionPerformed
