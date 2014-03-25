/**
 * 
 * @name testPeni
 * @author Alexey
 */
function testPeni() {
    var self = this, model = this.model, form = this;
    
    var peniCalc = new calculatePeni();

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        peniCalc.setPeniStartAndStop(model.params.st, model.params.end);
    }//GEN-LAST:event_buttonActionPerformed
}
