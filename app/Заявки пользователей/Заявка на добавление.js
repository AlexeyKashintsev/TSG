/**
 * 
 * @author TSG
 */
function formApplicationByFlat() {
    var self = this, model = this.model, form = this;
    
    // TODO : place your code here

    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    model.applicationInFlat.cursor.active = true;
    model.save();
    model.requery();
    }//GEN-LAST:event_btnSaveActionPerformed
}
