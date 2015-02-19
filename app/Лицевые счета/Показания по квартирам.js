/**
 * 
 * @author TSG
 */
function formFlatWorkSheet() {
    var self = this, model = this.model, form = this;
    
    var fmFlatChars = new charsFlat();
    var fmFlatServices = new fmServicesByFlat();
    var fmFlatCounters = new fmCounterValuesByFlat();
    var fmSaldoCur = new fmSaldoCurrnet();
    var fmSaldoHistory = new formSaldoHistory();
    var fmNachisleniya = new form_sums_per_flat();
    var fmOplata = new formPaymentsInFlat();
    var fmLCGroups = new fmGroupsByLC();
    var modCalc = new ServerModule('Calculations');
    
    
    self.check4Modifications = function(){
        if (!fmFlatChars.model.modified
            &&!fmFlatServices.model.modified
            &&!fmFlatCounters.model.modified
            &&!fmLCGroups.model.modified
            ||askAndSave())
            return true;
        else
            return false;
    }
    
    function askAndSave(){
    if (confirm('Сохранить изменения')){
        fmFlatChars.model.save();
        fmFlatServices.model.save();
        fmFlatCounters.model.save();
        fmLCGroups.model.save();
        return true;
        } else 
        return false;
    }
    
    self.setGroup = function(aNewGroupID){
        fmFlatServices.parGroupID = fmNachisleniya.ParGroupID = aNewGroupID;
    };
    
    self.setFlat = function(aNewFlatID){
        fmFlatCounters.parFlatID = fmFlatServices.parFlatID = fmNachisleniya.parFlatID = 
        fmOplata.parFlatID = fmSaldoHistory.parFlatID = fmSaldoCur.parFlatID =
        fmFlatChars.parFlatID = fmLCGroups.parFlatID = aNewFlatID;
    };

     

    function btnCalcAllGroupActionPerformed(evt) {//GEN-FIRST:event_btnCalcAllGroupActionPerformed
        modCalc.calculateValues(model.params.parGroupID, null, self.parDateID);
        fmNachisleniya.model.requery();
        fmSaldoCur.model.requery();
    }//GEN-LAST:event_btnCalcAllGroupActionPerformed

    function btnCalcAllFlatActionPerformed(evt) {//GEN-FIRST:event_btnCalcAllFlatActionPerformed
        modCalc.calculateValues(null, self.parFlatID, self.parDateID);
        fmNachisleniya.model.requery();
        fmSaldoCur.model.requery();
    }//GEN-LAST:event_btnCalcAllFlatActionPerformed

    function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
        fmFlatChars.showOnPanel(self.pnlFlatChars);
        fmFlatServices.showOnPanel(self.pnlServices);
        fmFlatCounters.showOnPanel(self.pnlCounters);
        fmSaldoCur.showOnPanel(self.pnlSaldoCur);
        fmSaldoHistory.showOnPanel(self.pnlSaldoHistory);
        fmNachisleniya.showOnPanel(self.pnlCurrent);
        fmOplata.showOnPanel(self.pnlOplata);
        fmLCGroups.showOnPanel(self.pnlLCGroups);
    }//GEN-LAST:event_formWindowOpened
}
