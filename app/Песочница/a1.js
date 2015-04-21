/**
 * 
 * @name aaa1
 * @author Alexey
 */
function aaa1() {
    var self = this, model = this.model, form = this;
    
    // TODO : place your code here

    function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
        alert("!");
    }//GEN-LAST:event_formWindowOpened

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        var runtime = new java.lang.Runtime.getRuntime();
        runtime.exec("open .");
    }//GEN-LAST:event_buttonActionPerformed
}
