/**
 * 
 * @name TestProgress
 * @author Alexey
 * @module
 * @public
 */ 
function TestProgress() {
    var self = this, model = this.model;
    var p = 0;
    var robot = new java.awt.Robot();

    
    self.testIt = function (max,desc) {
        (function() {
            if (serverProgress) {
                serverProgress.setMax(max);
                serverProgress.setDescription(desc);
                serverProgress.setValue();
            }
        }).invokeBackground();
    };
}
