/**
 * 
 * @name ProgressShow
 * @author Alexey
 */
function ProgressShow() {
    var self = this, model = this.model, form = this;
    var serverProgress = new ServerModule('ProgressServer');
    var shown = false;
    
    self.executeServerProcess = function(aServerFunction) {
        var robot = new java.awt.Robot();
        (function() {
            robot.delay(50);
            aServerFunction();
        }).invokeBackground();
        (function() {
            var b = true;
            var pd = {};
            while (b) {
                pd = serverProgress.getProgress();
                if (pd.finished) {
                    if (shown) {
                        form.close();
                        b = false;
                    }
                    shown = false;
                } else {
                    if (!shown)
                    (function() {
                        shown = true;
                        form.showModal();
                    }).invokeDelayed(50);
                    (function() {
                        form.progressBar.maximum = pd.max ? pd.max : 0;
                        form.progressBar.minimum = 0;
                        form.progressBar.value = pd.progress ? pd.progress : 0;
                        form.lblPrcName.text = pd.text ? pd.text : "";
                    }).invokeDelayed(5);
                }
                robot.delay(1000);
            }
        }).invokeBackground();
    };
    
    function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened

    }//GEN-LAST:event_formWindowOpened
}
