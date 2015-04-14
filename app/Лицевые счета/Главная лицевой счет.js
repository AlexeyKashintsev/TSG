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
    var fmUsers = new formApplicationByFlat();
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
        model.params.parGroupID =
        fmFlatServices.parGroupID = fmNachisleniya.ParGroupID = aNewGroupID;
    };
    
    self.setFlat = function(aNewFlatID){
        model.params.parFlatID =
        fmFlatCounters.parFlatID = fmFlatServices.parFlatID = fmNachisleniya.parFlatID = 
        fmOplata.parFlatID = fmSaldoHistory.parFlatID = fmSaldoCur.parFlatID =
        fmFlatChars.parFlatID = fmLCGroups.parFlatID = 
        fmUsers.parFlatID = aNewFlatID;
    };

     

    function btnCalcAllGroupActionPerformed(evt) {//GEN-FIRST:event_btnCalcAllGroupActionPerformed
        clientProgress.executeServerProcess(function(){
            modCalc.calculateValues(model.params.parGroupID, null, model.params.parDateID);
            fmNachisleniya.model.requery();
            fmSaldoCur.model.requery();
        });
        /*fmNachisleniya.model.requery();
        fmSaldoCur.model.requery();*/
    }//GEN-LAST:event_btnCalcAllGroupActionPerformed

    function btnCalcAllFlatActionPerformed(evt) {//GEN-FIRST:event_btnCalcAllFlatActionPerformed
         clientProgress.executeServerProcess(function(){
             modCalc.calculateValues(null, model.params.parFlatID, model.params.parDateID);
            fmNachisleniya.model.requery();
            fmSaldoCur.model.requery();
        });
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
        fmUsers.parentForm = self;
        fmUsers.showOnPanel(self.pnlUser);
    }//GEN-LAST:event_formWindowOpened
paramSynchronizer.addListener(this);
}
