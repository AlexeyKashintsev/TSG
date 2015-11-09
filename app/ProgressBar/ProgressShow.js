/**
 * 
 * @name ProgressShow
 * @author Alexey
 */
function ProgressShow() {
    var self = this, model = this.model, form = this;
    var serverProgress = new ServerModule('ProgressServer');
    var shown = false;
    
    var executing = false, queue = [];
    self.enqueServerProcess = function(aServerFunction, aFinishCallback) {
        if (!executing) {
            executing = true;
            self.executeServerProcess(aServerFunction, aFinishCallback);
        } else {
            queue.push({
                aSF: aServerFunction,
                aFC: aFinishCallback
            });
        }
    };
    
    function executeNextProcess() {
        executing = false;
        if (queue.length) {
            var el = queue.shift();
            self.enqueServerProcess(el.aSF, el.aFC);
        }            
    };
    
    self.executeServerProcess = function(aServerFunction, aFinishCallback) {
        var robot = new java.awt.Robot();
        (function() {
            //robot.delay(50);
            aServerFunction();
        }).invokeBackground();
        (function() {
            robot.delay(100);
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
                    if (aFinishCallback)
                        aFinishCallback();
                    executeNextProcess();
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
