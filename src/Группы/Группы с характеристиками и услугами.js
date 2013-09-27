/**
 * 
 * @author Alexey
 * @name Группы_с_характеристиками_и_услугами
 */

var fmGroups = new formGroups();
var fmGChars = new formGroupCharacteristics();
var fmGServs = new formServicesInGroup();

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
}//GEN-LAST:event_formWindowOpened
