/**
 * 
 * @author Alexey
 * @name mainWorkSheet
 * @public
 */

function mainWorkSheet() {


var self = this;


var fmGroups = new formGroups();
var fmFlats = new lc_in_group();
var fmFlatChars = new charsFlat();
var fmFlatServices = new fmServicesByFlat();
var fmFlatCounters = new fmCounterValuesByFlat();
var fmSaldoCur = new fmSaldoCurrnet();
var fmSaldoHistory = new formSaldoHistory();
var fmNachisleniya = new form_sums_per_flat();
var fmOplata = new formPaymentsInFlat();
var clcModule = new ServerModule('Calculations');

function check4Modifications(){
    if  ((!fmFlats.model.modified
        &&!fmFlatChars.model.modified
        &&!fmFlatServices.model.modified
        &&!fmFlatCounters.model.modified
        ||askAndSave)
        ||confirm('Не сохраненные изменения будут утеряны. Продолжить?'))
        return true;
    else
        return false;
}

function setGroup(aNewGroupID){
    parGroup = aNewGroupID;
    self.parFlatID = fmFlats.setCurrentGroup(parGroup);
    setFlat(self.parFlatID);
}

function setFlat(aNewFlatID){
    fmFlatCounters.parFlatID = fmFlatServices.parFlatID = fmNachisleniya.parFlatID = 
            fmOplata.parFlatID = fmSaldoHistory.parFlatID = fmSaldoCur.parFlatID =
            fmFlatChars.parFlatID = aNewFlatID;
}

function setDate(aNewDate){
    if (check4Modifications()){
        self.parDateID = aNewDate;
        fmFlatCounters.parDateID =
        fmNachisleniya.parDateID =
        fmSaldoCur.parDateID =
        fmNachisleniya.parDateID =
        fmOplata.parDateID = 
        fmFlats.parDateID = self.parDateID;
        return true;
    }
    else
        return false;
}

function askAndSave(){
    if (confirm('Сохранить изменения')){
        fmGChars.model.save();
        fmGServs.model.save();
        return true;
    } else return false;
}

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    fmGroups.parentForm = this;
    fmGroups.toolBarVisible = false;
    fmGroups.showOnPanel(self.pnlGroups);
    
    fmFlats.parentForm = this;
    fmFlats.isEditable = true;
    fmFlats.isSelectForm = false;
    fmFlats.showOnPanel(self.pnlFlats);
    
    fmFlatChars.showOnPanel(self.pnlFlatChars);
    fmFlatServices.showOnPanel(self.pnlServices);
    fmFlatCounters.showOnPanel(self.pnlCounters);
    fmSaldoCur.showOnPanel(self.pnlSaldoCur);
    fmSaldoHistory.showOnPanel(self.pnlSaldoHistory);
    fmNachisleniya.showOnPanel(self.pnlCurrent);
    fmOplata.showOnPanel(self.pnlOplata);
}//GEN-LAST:event_formWindowOpened

function formWindowClosed(evt) {//GEN-FIRST:event_formWindowClosed
    mainForm.fmWorksheet = null;
}//GEN-LAST:event_formWindowClosed

function btnCalcAllGroupActionPerformed(evt) {//GEN-FIRST:event_btnCalcAllGroupActionPerformed
    clcModule
}//GEN-LAST:event_btnCalcAllGroupActionPerformed


}