/**
 * 
 * @name ProgressServer
 * @author Alexey
 * @module
 * @public
 */ 
function ProgressServer() {
    var self = this, model = this.model;
    serverProgress = self;
    var progress, max, text;
    var finished = true;
    
    self.getProgress = function() {
        return {
            finished: finished,
            max: max,
            progress: progress,
            text: text
        };
    };
    
    self.setFinished = function(aValue) {
        finished = aValue;
    };
    
    self.setMax = function(aMaxValue) {
        finished = false;
        max = aMaxValue;
    };
    
    self.setValue = function(aValue) {
        progress = aValue;
    };

    self.increaseValue = function(aInc) {
        aInc ? progress += aInc : progress++;
    };
    
    self.setDescription = function(aDesc) {
        finished = false;
        text = aDesc;
    };
    
    self.finish = function() {
        finished = true;
    };
}
