/**
 * @name NewMonthInitializer4Lc
 * @author TSG
 * @module
 */ 
function NewMonthInitializer4Lc(anOldDate, aNewDate, aMainMod, aAccount) {
    var self = this, model = this.model;
    var initCNT = 0;
    
    //model.params.beginUpdate();
    /*model.params.parLcID = aLcID;
    model.params.parOldDate = anOldDate;
    model.params.parNewDate = aNewDate;*/
    
    model.dsSaldo.params.date_id = anOldDate;
    model.dsSaldo.params.account_id = aAccount;
    model.dsCntVal.params.date_id = anOldDate;
    model.dsCntVal.params.account_id = aAccount;
    
    
    function initializeSaldo4NewMonth() {
        var saldo = [];
        var i = 0;
        model.dsSaldo.forEach(function(cursor) {
            saldo[i] = {};
            saldo[i].lc_id = cursor.lc_id;
            saldo[i].sal_begin = cursor.sal_end;
            saldo[i].sal_penalties_old = 
                cursor.sal_penalties_old ? cursor.sal_penalties_old : 0 +
                cursor.sal_penalties_cur ? cursor.sal_penalties_cur : 0;
            saldo[i].date_id = aNewDate;
            saldo[i].account_id = aAccount;
            i++;
        });
        for (var j in saldo)
            model.dsSaldo.push(saldo[j]);
        ready();
    }


function initializeCounters4NewMonth() {
        var counters = [];
        var i = 0;
        model.dsCntVal.forEach(function(cursor) {
            if (!processedCounters[cursor.counter_id]) {
                counters[i] = {};
                counters[i].counter_id = cursor.counter_id;
                counters[i].date_id = aNewDate;
                counters[i].beg_val = cursor.end_val;                
                processedCounters[counters[i].counter_id] = true;
                i++;
            }
        });
        for (var j in counters)
            model.dsCntVal.push(counters[j]);        
        ready();
    }

  function ready() {
        serverProgress.increaseValue(1);
        initCNT++;
        if (initCNT===2) {
            model.save(function(){
               // aCallBack();
                aMainMod.ready();
            });
        }
    }
    
    model.dsSaldo.requery(function(){initializeSaldo4NewMonth();});
    model.dsCntVal.requery(function(){initializeCounters4NewMonth();});
}
