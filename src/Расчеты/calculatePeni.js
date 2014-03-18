/**
 * 
 * @author Alexey
 * @module
 * @public
 */ 
function calculatePeni() {
    var self = this, model = this.model;
    var SRF = 8.25 / 300 / 100;
    var peniStart = new Date();
    var peniEnd = new Date();
    var fullDays = 0;
    
    function daysBetween(startDate, endDate) {
        var millisecondsPerDay = 24 * 60 * 60 * 1000;
        return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
        
        function treatAsUTC(date) {
            var result = new Date(date);
            result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
            return result;
        }
    }
    
    self.setPeniStartAndStop = function(aStart, aEnd) {
        peniStart = aStart;
        peniEnd = aEnd;
        fullDays = daysBetween(peniStart, peniEnd);
        alert(fullDays);
    };
    
    self.calculate = function(aFlatID, aDateID) {
        model.params.beginUpdate();
        model.params.parDateID = aDateID;
        model.params.parFlatID = aFlatID;
        model.params.endUpdate();
        
        var sumOfDebt = model.saldo4calc.sal_begin;
        var curPeni = 0;
        var lastDate = peniStart;
        model.dsPayments.beforeFirst();
        while (model.dsPayments.next()) {
            var diff = daysBetween(model.dsPayments.payment_date, lastDate);
            if (diff <= 0){
                sumOfDebt -= model.dsPayments.payment_sum;
            } else {
                curPeni += sumOfDebt * diff * SRF;
                sumOfDebt -= model.dsPayments.payment_sum;
            };
            if (sumOfDebt <= 0) break;
        }
        if (sumOfDebt > 0) {
            curPeni += sumOfDebt * diff * SRF;
        }
    };
}
