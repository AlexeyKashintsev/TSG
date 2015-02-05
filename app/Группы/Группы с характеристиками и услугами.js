/**
 * 
 * @author Alexey
 * @name formAllGroups2
 * @public
 */

function formAllGroups2() {


var self = this;


var fmGroups = new formGroups();
var fmFlats = new lc_in_group();

self.check4Modifications = function(){
    /*if ((!fmGChars.model.modified
       &&!fmGServs.model.modified
       &&!fmGTarifs.model.modified
       ||askAndSave) 
       ||confirm('Не сохраненные изменения будут утеряны. Продолжить?'))
       return true;        
    else 
       return false;*/
};

self.setGroup = function(aNewGroupID){
    self.model.params.parGroupID = aNewGroupID;
    self.parFlatID = fmFlats.setCurrentGroup(self.parGroupID);
};

self.setFlat = function(aNewFlatID){
    self.parFlatID = aNewFlatID;    
};

self.setDate = function(aNewDateID){
    if (self.check4Modifications()){
        self.parDateID = aNewDateID;
        fmFlats.parDateID = self.parDateID;
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
}//GEN-LAST:event_formWindowOpened

function formWindowClosed(evt) {//GEN-FIRST:event_formWindowClosed
    self.mainForm.fmGroups = null;
}//GEN-LAST:event_formWindowClosed

}