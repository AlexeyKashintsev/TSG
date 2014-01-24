/**
 * 
 * @author Alexey
 * @resident
 * @module 
 */
function aaa() {
    var self = this;
    
    self.addSmth = function(){
        self.lc_by_ID.insert(self.lc_by_ID.md.lc_regto, 'bbb');
        self.model.save();
    };
}
