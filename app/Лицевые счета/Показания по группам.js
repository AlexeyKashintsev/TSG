/**
 * 
 * @author TSG
 */
function formGroupWorkSheet() {
    var self = this, model = this.model, form = this;
    
    var fmGChars = new formGroupCharacteristics();
    var fmGServs = new formServicesInGroup();
    var fmGTarifs = new fmTarifs();
    var fmGStats = new SaldoGroupView();
    var fmGrpAccounts = new fmAccountsByGroup();
    
    
    self.setGroup = function(aNewGroupID){
        fmGChars.parGroup = fmGServs.parGroup = 
        fmGTarifs.parGroupID = fmGStats.parGroup = 
        fmGrpAccounts.parGroupID = aNewGroupID;
    };

    self.setDate = function(aNewDate){
        fmGTarifs.parDateID = fmGStats.parDateBeg = 
        fmGStats.parDateEnd = aNewDate;
    };
    
    self.setEditDate = function(aEditDate){
        fmGTarifs.setEditDate(aEditDate);
        fmGStats.setEditDate(aEditDate);
    };
   
    self.setAccount = function(aNewAccount){
        fmGServs.parAccountID = fmGTarifs.parAccountID =
        fmGStats.parAccountID = aNewAccount;
    };
    
    function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
        fmGServs.showOnPanel(self.pnlGroupServ);
        fmGTarifs.showOnPanel(self.pnlGroupTarifs);   
        fmGStats.showOnPanel(self.pnlGroupData);
        fmGrpAccounts.showOnPanel(self.pnlAccounts);
        fmGChars.showOnPanel(self.pnlGroupChars1);
    }//GEN-LAST:event_formWindowOpened
}
