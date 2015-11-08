/**
 * 
 * @author Alexey
 * @name formSaldoHistory
 * @public
 */

function formSaldoHistory() {
    var self = this, model = self.model;
    
    self.setLcId = function(aFlatId) {
        model.params.parFlatID = aFlatId;
    };

    self.syncParams = function(aDate, anIsEditable, anAccount) {
        model.params.parAccountID = anAccount;
        model.requery();
        //model.params.parDateID = aDate;
        //model.params.parAccountID = anAccount;
    };


    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
        self.model.save();
    }//GEN-LAST:event_btnSaveActionPerformed
    paramSynchronizer.addListener(this);

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        var comment = prompt('Укажите комментарий к операции');
        if (comment) {
            var ssm = new ServerModule('SaldoAndSumsModule');
            var res = ssm.moveSaldo(model.dsSaldo.cursor.lc_id, model.dsSaldo.cursor.date_id, model.dsSaldo.cursor.account_id, comment);
            if (res != 0)
                alert(res);
            else {
                alert('Завершено');
                model.requery();
            }
        }
        
        
    }//GEN-LAST:event_buttonActionPerformed
}