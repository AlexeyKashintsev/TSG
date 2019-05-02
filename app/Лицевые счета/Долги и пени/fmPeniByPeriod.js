/**
 * 
 * @name fmPeniByPeriod
 * @author Алексей
 */
function fmPeniByPeriod() {
    var self = this, model = this.model, form = this;
    
    var dobj = {
        date: {},
        nach: {},
        paid: {},
        debt: {},
        debt0: {},
        debt30: {},
        debt90: {},
        peni_calc: {},
        peni_paid: {}
    };
    
    self.setParams = function(aLcId, anAccount) {
        model.qPeniRecordsByFlatByPeriod.params.flat = aLcId;
        model.qPeniRecordsByFlatByPeriod.params.account = anAccount;
    };

    function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
        var rep = new PeniByPeriodReport();
        rep.setParams(model.qPeniRecordsByFlatByPeriod.params.flat,
                    model.qPeniRecordsByFlatByPeriod.params.account, 
                    model.params.date_start, 
                    model.params.date_end);
        rep.show();
        form.close();
    }//GEN-LAST:event_button1ActionPerformed
}
