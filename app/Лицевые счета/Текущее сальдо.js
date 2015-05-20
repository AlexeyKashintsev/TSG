/**
 * 
 * @author Alexey
 * @name fmSaldoCurrnet
 * @public
 */

function fmSaldoCurrnet() {
    var self = this, model = self.model;

    paramSynchronizer.addListener(this);
    
    self.setLcId = function(aFlatId) {
        model.params.parFlatID = aFlatId;
    };

    function saldo_by_flatOnChanged(evt) {//GEN-FIRST:event_saldo_by_flatOnChanged
        model.save();
    }//GEN-LAST:event_saldo_by_flatOnChanged
}