/**
 * 
 * @name calculatePeni
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
    var dateMod = new DateModule();
    
    function daysBetween(startDate, endDate) {
        var millisecondsPerDay = 24 * 60 * 60 * 1000;
        return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
        
        function treatAsUTC(date) {
            var result = new Date(date);
            result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
            return result;
        }
    }
    
    function getAgregatedPaymentSumInPeriod(aDateID) {
        var pp = dateMod.getPayPeriod4Date(aDateID);
        model.dsPaySum.params.beg_date = pp.start;
        model.dsPaySum.params.end_date = pp.end;
        model.dsPaySum.execute();
        return model.dsPaySum.paySum;
    }
    
    function setCalcPaymentPeriod(aDateID) {
        var pp = dateMod.getPayPeriod4Date(aDateID);
        model.dsPayments.params.beg_date = pp.start;
        model.dsPayments.params.end_date = pp.end;
        model.dsPayments.requery();
        return pp;
    }
    
    self.calculate = function(aFlatID, aDateID) {
        var prevDate = dateMod.prevDate(aDateID);
        model.params.parFlatID = aFlatID;
        model.saldo4calc.params.dateid = prevDate;
        model.saldo4calc.requery();
        
        var sumOfDebt = model.saldo4calc.sal_begin;
        var sumOfPayments = getAgregatedPaymentSumInPeriod(prevDate);
        var curPeni = 0;
        
        if (sumOfDebt > sumOfPayments) {
           /* model.saldo4calc.params.dateid = aDateID;
            model.saldo4calc.requery();*/
            
            sumOfDebt -= sumOfPayments;
            var dates = setCalcPaymentPeriod(aDateID);
            var lastDate = dates.start;
            model.dsPayments.beforeFirst();
            while (model.dsPayments.next()) {
                var diff = daysBetween(lastDate, model.dsPayments.payment_date);
                lastDate = model.dsPayments.payment_date;
                if (diff <= 0){
                    sumOfDebt -= model.dsPayments.payment_sum;
                } else {
                    curPeni += sumOfDebt * diff * SRF;
                    sumOfDebt -= model.dsPayments.payment_sum;
                };
                if (sumOfDebt <= 0) break;
            }
            if (sumOfDebt > 0) {
                diff = daysBetween(lastDate, dates.end);
                curPeni += sumOfDebt * diff * SRF;
            }
        }
        return {
            current  : curPeni,
            previous : model.saldo4calc.cursor.sal_penalties_cur
        };
    };
}
