/**
 * 
 * @name PeniFixer
 * @author Алексей
 */
function PeniFixer() {
    var self = this, model = this.model, form = this;
    
    var calcPeni = new calcPeniNew();

    function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
        model.saldo4calc.params.groupid = model.params.group;
        model.saldo4calc.requery();
    }//GEN-LAST:event_button1ActionPerformed

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        model.prDeleteDebts.params.lc_id = null;
        model.prDeleteDebts.params.group_id = model.params.group;
        model.prDeleteDebts.params.date_id = model.params.date;
        model.prDeleteDebts.executeUpdate();
        model.saldo4calc.forEach(function(saldo) {
            calcPeni.calculate(saldo, saldo.sal_payments);
        });
    }//GEN-LAST:event_buttonActionPerformed

    function button2ActionPerformed(evt) {//GEN-FIRST:event_button2ActionPerformed
        model.prDeleteDebts.params.lc_id = model.saldo4calc.cursor.lc_id;
        model.prDeleteDebts.params.group_id = model.params.group;
        model.prDeleteDebts.params.date_id = model.params.date;
        model.prDeleteDebts.executeUpdate();
        var saldo =  model.saldo4calc.cursor;
        calcPeni.calculate(saldo, saldo.sal_payments);
    }//GEN-LAST:event_button2ActionPerformed

    function button3ActionPerformed(evt) {//GEN-FIRST:event_button3ActionPerformed
        model.saldo4calc.params.groupid = null;
        model.saldo4calc.requery();
    }//GEN-LAST:event_button3ActionPerformed
}
