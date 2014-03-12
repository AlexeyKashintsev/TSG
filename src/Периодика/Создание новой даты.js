/**
 * 
 * @author Alexey
 * @module
 */ 
function NewMonthInitializer4Group(anOldDate, aNewDate, aGroupID, aMainMod) {
    var self = this, model = this.model;
    var initCNT = 0;
    
    model.params.beginUpdate();
    model.params.parGroupID = aGroupID;
    model.params.parOldDate = anOldDate;
    model.params.endUpdate();
    
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
            i++;
        }
        for (var j in tarifs)
            model.dsTarifsInGroup.push(tarifs[j]);        
        ready();
    }
    
    function initializeCounters4NewMonth() {
        var counters = [];
        model.dsCntVal.beforeFirst();
        var i = 0;
        while (model.dsCntVal.next()){
            counters[i] = {};
            counters[i].counter_id = model.dsCntVal.counter_id;
            counters[i].date_id = aNewDate;
            counters[i].beg_val = model.dsCntVal.end_val;
            i++;
        }
        for (var j in counters)
            model.dsCntVal.push(counters[j]);        
        ready();
    }
    
    function initializeSaldo4NewMonth() {
        var saldo = [];
        model.dsSaldo.beforeFirst();
        var i = 0;
        while (model.dsSaldo.next()) {
            saldo[i] = {};
            saldo[i].lc_id = model.dsSaldo.cursor.lc_id;
            saldo[i].sal_begin = model.dsSaldo.cursor.sal_end;
            saldo[i].sal_penalties_old = 
                model.dsSaldo.cursor.sal_penalties_old?model.dsSaldo.cursor.sal_penalties_old:0 +
                model.dsSaldo.cursor.sal_penalties_cur?model.dsSaldo.cursor.sal_penalties_cur:0;
            saldo[i].date_id = aNewDate;
            i++;
        }
        for (var j in saldo)
        model.dsSaldo.push(saldo[j]);
        ready();
    }
    
    function ready() {
        initCNT++;
        if (initCNT===3) {
            model.save(function(){
               // aCallBack();
                aMainMod.ready();
            });
        }
    }
    
    model.dsTarifsInGroup.requery(function(){initializeTarifs4NewMonth();});
    model.dsCntVal.requery(function(){initializeCounters4NewMonth();});
    model.dsSaldo.requery(function(){initializeSaldo4NewMonth();});
}
