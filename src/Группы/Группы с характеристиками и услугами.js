/**
 * 
 * @author Alexey
 * @name formAllGroups2
 * @public
 */

function formAllGroups2() {


var self = this;


var fmGroups = new formGroups();
var fmGChars = new formGroupCharacteristics();
var fmGServs = new formServicesInGroup();
var fmGTarifs = new fmTarifs();

function check4Modifications(){
    if ((!fmGChars.model.modified
       &&!fmGServs.model.modified
       &&!fmGTarifs.model.modified
       ||askAndSave) 
       ||confirm('Не сохраненные изменения будут утеряны. Продолжить?'))
       return true;        
    else 
       return false;
}

function setGroup(aNewGroupID){
    fmGChars.parGroup = fmGServs.parGroup = fmGTarifs.parGroupID =
            aNewGroupID;
}

function setDate(aNewDateID){
    if (check4Modifications()){
        self.parDateID = aNewDateID;
        fmGTarifs.parDateID = self.parDateID;
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
    fmGTarifs.modelCombo.visible = false;
    fmGroups.showOnPanel(self.pnlGroups);
    fmGChars.showOnPanel(self.pnlGroupChars);
    fmGServs.showOnPanel(self.pnlGroupServ);
    fmGTarifs.showOnPanel(self.pnlGroupTarifs);   
}//GEN-LAST:event_formWindowOpened

function formWindowClosed(evt) {//GEN-FIRST:event_formWindowClosed
    mainForm.fmGroups = null;
}//GEN-LAST:event_formWindowClosed

}