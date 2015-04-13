/**
 * 
 * @author Alexey
 * @module
 * @public
 */ 
function TestProgress() {
    var self = this, model = this.model;
    var m = 500;
    var p = 0;
    var d = "Тест прогресс бара";
    var robot = new java.awt.Robot();

    
    self.testIt = function () {
        (function() {
            if (serverProgress) {
                serverProgress.setMax(m);
                serverProgress.setDescription(d);
                for (var j = 0; j < m; j++) {
                    serverProgress.setValue(j);
                    robot.delay(5);
                }
                serverProgress.finish();
            }
        }).invokeBackground();
    };
}
