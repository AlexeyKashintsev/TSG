/**
 * 
 * @author Alexey
 */
function fmDetailInfoByGroup() {
    var self = this, model = this.model, form = this;
    
    self.syncParams = function(aDate, anIsEditable, anAccount) {
        model.qLcFlatAndSaldo4Report.params.date_id = model.params.parDateEnd = aDate;
        model.qLcFlatAndSaldo4Report.params.account_id = anAccount;
        model.requery();
    };    
    
    paramSynchronizer.addListener(this);
    
}
