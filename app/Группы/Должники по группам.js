/**
 * 
 * @author TSG
 * @name debt_in_group
 * @public
 */
function debt_in_group() {
    var self = this, model = this.model, form = this;
    
    /*model.qFlatWithDebtInGroup.filter(function(row){
        if (row.sal_end > 10000)
            return model.qFlatWithDebtInGroup;
        });*/
    
self.syncParams = function(aDate, anIsEditable, anAccount) {
     model.params.parDateID = aDate;    
    //model.params.parDateID = aDate;
    //model.params.parAccountID = anAccount;
};
        
    function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
     model.params.parDebt = 0;
     self.modelSpin.value = model.params.parDebt;
     model.params.show_all_options = true;
    }//GEN-LAST:event_formWindowOpened
paramSynchronizer.addListener(this);

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        var dateDebt = '';
        var date = self.all_dates.findById(model.params.parDateID).per_date;
        var monthNames = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
               "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ];
        dateDebt = (monthNames[date.getMonth()]+" "+date.getFullYear());
        var deb = [];
        model.debt_by_group.forEach(function(aRow){
            deb.push(aRow);
        });
        var reportObject = {
            count:          model.dsStatDebt.count,
            sum:            model.dsStatDebt.sum,
            debtValues:     deb,
            date:           dateDebt,
            grp_name:       model.debt_by_group.grp_name
        };
        var repBill = new BillsDebtByGroup(reportObject);
        repBill.show();
    }//GEN-LAST:event_buttonActionPerformed
}
