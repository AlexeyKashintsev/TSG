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
var fmLCGroups = new fmGroupsByLC();
var modCalc = new ServerModule('Calculations');
var fmGChars = new formGroupCharacteristics();
var fmGServs = new formServicesInGroup();
var fmGTarifs = new fmTarifs();
var fmGStats = new SaldoGroupView();


self.check4Modifications = function(){
    if  ((!fmFlats.model.modified
        &&!fmFlatChars.model.modified
        &&!fmFlatServices.model.modified
        &&!fmFlatCounters.model.modified
        &&!fmLCGroups.model.modified
        ||askAndSave)
        ||confirm('Не сохраненные изменения будут утеряны. Продолжить?'))
        return true;
    else
        return false;
};

self.setGroup = function(aNewGroupID){
    self.parGroupID = fmFlatServices.parGroupID = fmNachisleniya.ParGroupID = fmGChars.parGroup = 
            fmGServs.parGroup = fmGTarifs.parGroupID =
            fmGStats.parGroup = aNewGroupID;
    self.parFlatID = fmFlats.setCurrentGroup(self.parGroupID);
    self.tabbedPane1.visible = true;
    self.tabbedPane.visible = false;
    self.pnlSaldoCur.visible = false; 
    //self.setFlat(self.parFlatID);
};

self.setFlat = function(aNewFlatID){
    self.parFlatID = fmFlatCounters.parFlatID = fmFlatServices.parFlatID = fmNachisleniya.parFlatID = 
            fmOplata.parFlatID = fmSaldoHistory.parFlatID = fmSaldoCur.parFlatID =
            fmFlatChars.parFlatID = fmLCGroups.parFlatID = aNewFlatID;
    self.tabbedPane1.visible = false;
    self.tabbedPane.visible = true;
    self.pnlSaldoCur.visible = true; 
};

self.setDate = function(aNewDate){
    if (self.check4Modifications()){
        self.parDateID = aNewDate;
        fmFlatCounters.parDateID =
        fmNachisleniya.parDateID =
        fmSaldoCur.parDateID =
        fmNachisleniya.parDateID =
        fmOplata.parDateID = 
        fmFlats.parDateID = 
        fmGTarifs.parDateID = fmGStats.parDate =
        fmFlatServices.parDateID = self.parDateID;
        return true;
    }
    else
        return false;
};

self.setEditDate = function(aEditDate){
    if (self.check4Modifications()){
        self.parEditDate = aEditDate;
        fmFlatCounters.setEditDate(aEditDate);
        fmNachisleniya.setEditDate(aEditDate);
        fmGTarifs.setEditDate(aEditDate);
        fmGStats.setEditDate(aEditDate);
        return true;
    }
    else
        return false;    
};

function askAndSave(){
    if (confirm('Сохранить изменения')){
        fmGChars.model.save();
        fmGServs.model.save();
        return true;
    } else return false;
}

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    fmGroups.parentForm = self;
    fmGroups.toolBarVisible = true;
    fmGroups.showOnPanel(self.pnlGroups);
    
    fmFlats.parentForm = self;
    fmFlats.isEditable = true;
    fmFlats.isSelectForm = false;
    fmFlats.showOnPanel(self.pnlFlats);
    
    self.tabbedPane1.visible = true;
    self.tabbedPane.visible = false;
    
    fmFlatChars.showOnPanel(self.pnlFlatChars);
    fmFlatServices.showOnPanel(self.pnlServices);
    fmFlatCounters.showOnPanel(self.pnlCounters);
    fmSaldoCur.showOnPanel(self.pnlSaldoCur);
    fmSaldoHistory.showOnPanel(self.pnlSaldoHistory);
    fmNachisleniya.showOnPanel(self.pnlCurrent);
    fmOplata.showOnPanel(self.pnlOplata);
    fmLCGroups.showOnPanel(self.pnlLCGroups);
    fmGChars.showOnPanel(self.pnlGroupChars1);
     fmGroups.showOnPanel(self.pnlGroups);
    fmGServs.showOnPanel(self.pnlGroupServ);
    fmGTarifs.showOnPanel(self.pnlGroupTarifs);   
    fmGStats.showOnPanel(self.pnlGroupData);
}//GEN-LAST:event_formWindowOpened

function formWindowClosed(evt) {//GEN-FIRST:event_formWindowClosed
    mainForm.fmWorksheet = null;
}//GEN-LAST:event_formWindowClosed

function btnCalcAllGroupActionPerformed(evt) {//GEN-FIRST:event_btnCalcAllGroupActionPerformed
    modCalc.calculateValues(self.parGroupID, null, self.parDateID);
    fmNachisleniya.model.requery();
    fmSaldoCur.model.requery();
}//GEN-LAST:event_btnCalcAllGroupActionPerformed

function btnCalcAllFlatActionPerformed(evt) {//GEN-FIRST:event_btnCalcAllFlatActionPerformed
    modCalc.calculateValues(null, self.parFlatID, self.parDateID);
    fmNachisleniya.model.requery();
    fmSaldoCur.model.requery();
}//GEN-LAST:event_btnCalcAllFlatActionPerformed


}