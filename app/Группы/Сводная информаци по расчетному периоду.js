/**
 * 
 * @name SaldoGroupView
 * @author Alexey
 */
function SaldoGroupView() {
    var self = this, model = this.model, form = this;
    var repBill = null;
    var reportObject = {};
   /* var reportObject = {
        sal_begin   :   model.dsBeginSaldoInGroup.cursor.sal_begin,
        sal_end     :   model.dsEndSaldoInGroup.cursor.sal_end ,
        saldoValues :   model.dsSaldoInGroupForPeriod,
        chargesValues:  model.dsChargesForGroup
    };
    var repBill = new BillsSaldoGroup(reportObject);
    */

self.syncParams = function(aDate, anIsEditable, anAccount) {
    self.modelGrid.editable = anIsEditable;
    model.params.parDateBeg = model.params.parDateEnd = aDate;
    model.params.parAccountID = anAccount;
    model.requery();
    //model.params.parDateID = aDate;
    //model.params.parAccountID = anAccount;
};

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        var dateBeg = '';
                    var date = self.all_dates.findById(model.params.parDateBeg).per_date;
                    var monthNames = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                           "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ];
                    var monthNamesRP = [ "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
                           "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря" ];
                    dateBeg = (monthNames[date.getMonth()]+" "+date.getFullYear());
        var dateEnd = '';
                    var date = self.all_dates.findById(model.params.parDateEnd).per_date;
                    var monthNames = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                           "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ];
                    var monthNamesRP = [ "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
                           "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря" ];
                    dateEnd = (monthNames[date.getMonth()]+" "+date.getFullYear());  
        var cv = [];
        model.dsChargesForGroup.forEach(function(aRow) {
            cv.push(aRow);
        })
        var reportObject = {
            sal_begin   :   model.dsBeginSaldoInGroup.sal_begin,
            sal_end     :   model.dsEndSaldoInGroup.sal_end ,
            saldoValues :   model.dsSaldoInGroupForPeriod[0],
            chargesValues:  cv,
            dateBeg:        dateBeg,
            dateEnd:        dateEnd,
            grp_name:       model.group_by_id.cursor.grp_name,
            grp_adress:     model.group_by_id.cursor.grp_address
        };
        var repBill = new BillsSaldoGroup(reportObject);
    
        repBill.show();
    }//GEN-LAST:event_buttonActionPerformed

paramSynchronizer.addListener(this);
}

