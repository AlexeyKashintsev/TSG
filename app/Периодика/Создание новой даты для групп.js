/**
 * 
 * @name NewMonthInitializer4Group
 * @author Alexey
 * @module
 */ 
function NewMonthInitializer4Group(anOldDate, aNewDate, aGroupID, aMainMod, aProgress, aAccount) {
    var self = this, model = this.model;
    var initCNT = 0;
    
    model.params.beginUpdate();
    model.params.parGroupID = aGroupID;
    model.params.parOldDate = anOldDate;
    model.params.parNewDate = aNewDate;
    model.params.parAccountID = aAccount;
    
    function initializeTarifs4NewMonth() {
        var tarifs = [];
        model.dsTarifsInGroup.beforeFirst();
        var i = 0;
        while (model.dsTarifsInGroup.next()) {
            tarifs[i] = {};
            tarifs[i].services_id = model.dsTarifsInGroup.cursor.services_id;
            tarifs[i].group_id = model.dsTarifsInGroup.cursor.group_id;
            tarifs[i].norm = model.dsTarifsInGroup.cursor.norm;
            tarifs[i].rate = model.dsTarifsInGroup.cursor.rate;
            tarifs[i].date_id = aNewDate;
            tarifs[i].account_id = aAccount;
            i++;
        }
        for (var j in tarifs)
            model.dsTarifsInGroup.push(tarifs[j]);        
        ready();
    }
    
    
    
    
    
    function ready() {
        (function(){aProgress.increaseValue(1);}).invokeAndWait();
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
