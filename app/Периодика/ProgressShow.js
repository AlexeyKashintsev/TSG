/**
 * 
 * @name ProgressShow
 * @author Alexey
 */
function ProgressShow() {
    var self = this, model = this.model, form = this;
    
    self.setMax = function(aMaxValue) {
        form.progressBar.maximum = aMaxValue;
        form.progressBar.minimum = 0;
        form.progressBar.value = 0;
    };
    
    self.setValue = function(aValue) {
        form.progressBar.value = aValue;
    };
    
    self.getValue = function() {
        return form.progressBar.value;
    };
    
    self.increaseValue = function(aInc) {
        form.progressBar.value += aInc;
    };
}
