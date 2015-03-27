/**
 * 
 * @name ReportPrint
 * @author Alexey
 */
function ReportPrint() {
    var self = this, model = this.model, form = this;
    var repBill = new BillsBuilder_Doverie();
    var repBillKapRemont = new BillsBuilder_Doverie_kapRemont();
    
    function process(aPrint) {
        if (model.params.FlatID) {
            processSingleFlat(aPrint, model.params.FlatID);
        } else {
            model.flats_by_group.beforeFirst();
            if (confirm('Вы собираетесь открыть '+ (model.params.flatTo - model.params.flatFrom + 1) +' файлов'))
            {while (model.flats_by_group.next())
                if ((!model.params.flatFrom && !model.params.flatTo) || 
                   ((model.params.flatFrom <= model.flats_by_group.lc_flatnumber) && (model.params.flatTo >= model.flats_by_group.lc_flatnumber)))
                    processSingleFlat(aPrint, model.flats_by_group.lc_flat_id);
             }
        }
    }
    
    function processSingleFlat(aPrint, aFlatID) {
        if (model.params.AccountID == 142486607303119){
            repBill.model.params.parDateID = self.params.parDateID;
            repBill.model.params.parFlatID = aFlatID; 
            repBill.model.params.parAccountID = self.params.AccountID;
            if (aPrint) 
                repBill.print();
            else
                repBill.show();
        }
        else{
            repBillKapRemont.model.params.parDateID = self.params.parDateID;
            repBillKapRemont.model.params.parFlatID = aFlatID; 
            repBillKapRemont.model.params.parAccountID = self.params.AccountID;
            if (aPrint) 
                repBillKapRemont.print();
            else
                repBillKapRemont.show();
        }
    }

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        process(false);        
    }//GEN-LAST:event_buttonActionPerformed

    function btnPrintActionPerformed(evt) {//GEN-FIRST:event_btnPrintActionPerformed
        process(true);
    }//GEN-LAST:event_btnPrintActionPerformed
    
    paramSynchronizer.addListener(this);
}
