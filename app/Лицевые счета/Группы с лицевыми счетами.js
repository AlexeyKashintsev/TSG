/**
 * 
 * @author Alexey
 * @name mainWorkSheet
 * @public
 */

function mainWorkSheet() {


var self = this, model = self.model;


var fmGroups = new formGroups();
var fmFlats = new FlatsInGroup();
var fmFlatIssues = new formLcIssues();
var fmGroupSheet = new formGroupWorkSheet();
var fmFlatSheet = new formFlatWorkSheet();



self.check4Modifications = function(){
    if  ((!fmFlats.model.modified
        /*&&!fmFlatChars.model.modified
        &&!fmFlatServices.model.modified
        &&!fmFlatCounters.model.modified
        &&!fmLCGroups.model.modified*/
        &&!fmFlatIssues.model.modified
        ||askAndSave)
        ||confirm('Не сохраненные изменения будут утеряны. Продолжить?'))
        return true;
    else
        return false;
};

self.setGroup = function(aNewGroupID){
    model.params.parGroupID = null;
    model.dsAccountsByGroup.params.GroupId = aNewGroupID;
    model.dsAccountsByGroup.requery(function() {
        model.dsAccountsByGroup.forEach(function(cursor) {
            if (cursor.account_id == self.model.params.parAccountID) 
                model.params.parGroupID = aNewGroupID;
        });
        fmGroupSheet.setGroup(aNewGroupID);
        fmFlatSheet.setGroup(aNewGroupID);
        fmFlatIssues.parGroup = aNewGroupID;
        self.parFlatID = fmFlats.setCurrentGroup(model.params.parGroupID);
        model.params.parGroupID = aNewGroupID;
        fmFlatSheet.close();
        fmGroupSheet.showOnPanel(self.panel);
               
    });

};

self.setFlat = function(aNewFlatID){
    self.parFlatID =  fmFlatIssues.parFlat = aNewFlatID;
    fmFlatSheet.setFlat(aNewFlatID);
    fmGroupSheet.close();
    fmFlatSheet.showOnPanel(self.panel);
    //fmFlatIssues.setBtnVisible();
};

self.setDate = function(aNewDate){
    if (self.check4Modifications()){
        self.parDateID = aNewDate;
        fmGroupSheet.setDate(aNewDate);
        fmFlatSheet.setDate(aNewDate);
        fmFlats.parDateID = fmFlatIssues.parDate = self.parDateID;
        return true;
    }
    else
        return false;
};

self.setEditDate = function(aEditDate){
    if (self.check4Modifications()){
        self.parEditDate = aEditDate;
        fmGroupSheet.setEditDate(aEditDate);
        fmFlatSheet.setEditDate(aEditDate);
               
        return true;
    }
    else
        return false;    
};

self.setAccount = function(aNewAccount){
    if (self.check4Modifications()){
        self.parAccountID = aNewAccount;
        fmGroupSheet.setAccount(aNewAccount);
        fmFlatSheet.setAccount(aNewAccount);
        self.setGroup(model.params.parGroupID);
        return true;
    }
    else
        return false;    
};

function askAndSave(){
    if (confirm('Сохранить изменения')){
        return true;
    } else return false;
}

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    fmGroups.parentForm = self;
    fmGroups.toolBarVisible = true;
    fmGroups.showOnPanel(self.pnlGroups);
    
    fmFlats.mainForm = self.mainForm;
    fmFlats.parentForm = self;
    fmFlats.isEditable = true;
    fmFlats.isSelectForm = false;
    fmFlats.showOnPanel(self.pnlFlats);
         
    fmGroups.showOnPanel(self.pnlGroups);
    fmGroupSheet.showOnPanel(self.panel);
}//GEN-LAST:event_formWindowOpened

function formWindowClosed(evt) {//GEN-FIRST:event_formWindowClosed
    //mainForm.fmWorksheet = null;
}//GEN-LAST:event_formWindowClosed


}