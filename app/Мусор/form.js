/**
 * 
 * @author TSG
 */
function form() {
    var self = this, model = this.model, form = this;
    model.all_dates.requery();

        model.ds.requery();
    model.params.onChanged = function(event) {
        model.ds.requery();
    };
    
self.paramsOnChanged = function(evt){
    model.ds.requery();
};

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        var proc = new java.lang.Runtime.getRuntime();
        proc.exec('"C:\\Documents and Settings\\TSG\\a12\\1.bat" 123');
         //new ProcessBuilder("cmd", "C:\Documents and Settings\TSG\a12\1.bat").start();
    }//GEN-LAST:event_buttonActionPerformed
}
