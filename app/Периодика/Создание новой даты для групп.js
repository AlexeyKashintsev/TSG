/**
 * 
 * @name NewMonthInitializer4Group
 * @author Alexey
 * @module
 */ 
function NewMonthInitializer4Group(anOldDate, aNewDate, aGroupID, aMainMod, aAccount) {
    var self = this, model = this.model;
    var initCNT = 0;
    
    model.params.beginUpdate();
    model.params.parGroupID = aGroupID;
    model.params.parOldDate = anOldDate;
    model.params.parNewDate = aNewDate;
    model.params.parAccountID = aAccount;
    
    function initializeTarifs4NewMonth() {
        var tarifs = [];
        var i = 0;
        model.dsTarifsInGroup.forEach(function(cursor) {
            tarifs[i] = {};
            tarifs[i].services_id = cursor.services_id;
            tarifs[i].group_id = cursor.group_id;
            tarifs[i].norm = cursor.norm;
            tarifs[i].rate = cursor.rate;
            tarifs[i].date_id = aNewDate;
            tarifs[i].account_id = aAccount;
            i++;
        });
        for (var j in tarifs)
            model.dsTarifsInGroup.push(tarifs[j]);        
        ready();
    }
    
    
    
    
    
    function ready() {
        serverProgress.increaseValue(1);
        initCNT++;
        if (initCNT===1) {
            model.save(function(){
               // aCallBack();
                aMainMod.ready();
            });
        }
    }
    
    model.dsTarifsInGroup.requery(function(){initializeTarifs4NewMonth();});
   
}
