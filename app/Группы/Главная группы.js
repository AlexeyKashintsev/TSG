/**
 * 
 * @name formGroupWorkSheet
 * @author TSG
 */
function formGroupWorkSheet() {
    var self = this, model = this.model, form = this;
    
    var fmGChars = new formGroupCharacteristics();
    var fmGServs = new formServicesInGroup();
    var fmGTarifs = new fmTarifs();
    var fmGStats = new SaldoGroupView();
    var fmGrpAccounts = new fmAccountsByGroup();
    
    
        self.check4Modifications = function(){
        if (!fmGChars.model.modified
            &&!fmGServs.model.modified
            &&!fmGTarifs.model.modified
            &&!fmGrpAccounts.model.modified
            ||askAndSave())
            return true;
        else
            return false;
    }
    
    function askAndSave(){
    if (confirm('Сохранить изменения')){
        fmGChars.model.save();
        fmGServs.model.save();
        fmGTarifs.model.save();
        fmGrpAccounts.model.save();
        return true;
        } else 
        return false;
    }
    
    self.setGroup = function(aNewGroupID){
        fmGChars.parGroup = fmGServs.parGroup = 
        fmGTarifs.parGroupID = fmGStats.parGroup = 
        fmGrpAccounts.parGroupID = aNewGroupID;
    };
         
    function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
        fmGServs.showOnPanel(self.pnlGroupServ);
        fmGTarifs.showOnPanel(self.pnlGroupTarifs);   
        fmGStats.showOnPanel(self.pnlGroupData);
        fmGrpAccounts.showOnPanel(self.pnlAccounts);
        fmGChars.showOnPanel(self.pnlGroupChars1);
    }//GEN-LAST:event_formWindowOpened
}
