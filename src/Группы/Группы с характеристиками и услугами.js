/**
 * 
 * @author Alexey
 * @name Группы_с_характеристиками_и_услугами
 * @public
 */

var fmGroups = new formGroups();
var fmGChars = new formGroupCharacteristics();
var fmGServs = new formServicesInGroup();
var fmGTarifs = new formTarifs();

function check4Modifications(){
    if ((!fmGChars.model.modified&&!fmGServs.model.modified||askAndSave)||
        confirm('Не сохраненные изменения будут утеряны. Продолжить?')){
            return true;
        }
    else return false;
}

function changeGroup(aNewGroup){
    if (check4Modifications()){
        fmGChars 
    }
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
    fmGroups.showOnPanel(pnlGroups);
    fmGChars.showOnPanel(pnlGroupChars);
    fmGServs.showOnPanel(pnlGroupServ);
    fmGTarifs.showOnPanel(pnlGroupTarifs);   
}//GEN-LAST:event_formWindowOpened
