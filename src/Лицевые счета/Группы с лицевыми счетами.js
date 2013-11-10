/**
 * 
 * @author Alexey
 * @name mainWorkSheet
 * @public
 */

var fmGroups = new formGroups();
var fmFlats = new lc_in_group();
var fmFlatChars = new charsFlat();
var fmFlatServices = new fmServicesByFlat();
var fmFlatCounters = new fmCounterValuesByFlat();
var fmSaldoCur = new fmSaldoCurrnet();
var fmSaldoHistory = new formSaldoHistory();
var fmNachisleniya = new form_sums_per_flat();
var fmOplata = new formPaymentsInFlat();

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
    parFlatID = fmFlats.setCurrentGroup(parGroup);
    setFlat(parFlatID);
}

function setFlat(aNewFlatID){
    fmFlatCounters.parFlatID = fmFlatServices.parFlatID = fmNachisleniya.parFlatID = 
            fmOplata.parFlatID = fmSaldoHistory.parFlatID = fmSaldoCur.parFlatID =
            fmFlatChars.parFlatID = aNewFlatID;
}

function setDate(aNewDate){
    parDateID = aNewDate;
    fmFlatCounters.parDateID =
    fmNachisleniya.parDateID =
    fmSaldoCur.parDateID =
    fmNachisleniya.parDateID =
    fmOplata.parDateID = 
    fmFlats.parDateID = parDateID;
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
    fmGroups.showOnPanel(pnlGroups);
    
    fmFlats.parentForm = this;
    fmFlats.isEditable = true;
    fmFlats.isSelectForm = false;
    fmFlats.showOnPanel(pnlFlats);
    
    fmFlatChars.showOnPanel(pnlFlatChars);
    fmFlatServices.showOnPanel(pnlServices);
    fmFlatCounters.showOnPanel(pnlCounters);
    fmSaldoCur.showOnPanel(pnlSaldoCur);
    fmSaldoHistory.showOnPanel(pnlSaldoHistory);
    fmNachisleniya.showOnPanel(pnlCurrent);
    fmOplata.showOnPanel(pnlOplata);
}//GEN-LAST:event_formWindowOpened

function formWindowClosed(evt) {//GEN-FIRST:event_formWindowClosed
    mainForm.fmWorksheet = null;
}//GEN-LAST:event_formWindowClosed

