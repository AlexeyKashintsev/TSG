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
        &&!fmGroups.model.modified
        &&!fmFlatIssues.model.modified
        &&!fmFlatSheet.check4Modifications()
        &&!fmGroupSheet.check4Modifications()
        ||askAndSave)
        ||confirm('Не сохраненные изменения будут утеряны. Продолжить?'))
        return true;
    else
        return false;
};

self.setGroup = function(aNewGroupID, aFlatID){
    model.params.parGroupID = null;
    model.dsAccountsByGroup.params.GroupId = aNewGroupID;
    model.dsAccountsByGroup.execute(function() {
        model.dsAccountsByGroup.forEach(function(cursor) {
            if (cursor.account_id == self.model.params.parAccountID) 
                model.params.parGroupID = aNewGroupID;
        });
        fmGroupSheet.setGroup(aNewGroupID);
        fmFlatSheet.setGroup(aNewGroupID);
        fmFlatIssues.parGroup = aNewGroupID;
        self.parFlatID = fmFlats.setCurrentGroup(model.params.parGroupID);
        model.params.parGroupID = aNewGroupID;
        if(!aFlatID){
            fmFlatSheet.close();
            fmGroupSheet.showOnPanel(self.panel);
        }           
    });

};

self.setFlat = function(aNewFlatID){
    self.parFlatID =  fmFlatIssues.parFlat = aNewFlatID;
    fmFlatSheet.setFlat(aNewFlatID);
    fmGroupSheet.close();
    fmFlatSheet.showOnPanel(self.panel);
    //fmFlatIssues.setBtnVisible();
};


function askAndSave(){
    if (confirm('Сохранить изменения')){
        fmFlats.model.save();
        fmGroups.model.save();
        fmFlatIssues.model.save();
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

paramSynchronizer.addListener(this);
}