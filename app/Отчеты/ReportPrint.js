/**
 * 
 * @name ReportPrint
 * @author Alexey
 */
function ReportPrint() {
    var self = this, model = this.model, form = this;
    var repBill = new BillsBuilder_Doverie();
    
    function process(aPrint) {
        if (model.params.FlatID) {
            processSingleFlat(aPrint, model.params.FlatID);
        } else {
            model.flats_by_group.beforeFirst();
            while (model.flats_by_group.next())
                if ((!model.params.flatFrom && !model.params.flatTo) || 
                   ((model.params.flatFrom <= model.flats_by_group.lc_flatnumber) && (model.params.flatTo >= model.flats_by_group.lc_flatnumber)))
                    processSingleFlat(aPrint, model.flats_by_group.lc_flat_id);
        }
    }
    
    function processSingleFlat(aPrint, aFlatID) {
        repBill.model.params.parDateID = self.params.parDateID;
        repBill.model.params.parFlatID = aFlatID;        
        if (aPrint) 
            repBill.print();
        else
            repBill.show();
    }

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        process(false);
    }//GEN-LAST:event_buttonActionPerformed

    function btnPrintActionPerformed(evt) {//GEN-FIRST:event_btnPrintActionPerformed
        process(true);
    }//GEN-LAST:event_btnPrintActionPerformed
}
