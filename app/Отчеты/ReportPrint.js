/**
 * 
 * @name ReportPrint
 * @author Alexey
 */
function ReportPrint() {
    var self = this, model = this.model, form = this;
    var repBill;// = new BillsBuilder_Doverie();
    //var repBillKapRemont = new Report(reportName);//BillsBuilder_Doverie_kapRemont();
    
    function process(aPrint) {
        repBill = new Report(model.dsAllAccounts.find(model.dsAllAccounts.schema.grp_account_id, model.params.AccountID)[0].report_name);
        if (model.params.FlatID) {
            processSingleFlat(aPrint, model.params.FlatID);
        } else {
            if (!repBill.all_flats) {
                model.flats_by_group.beforeFirst();
                if (confirm('Вы собираетесь открыть '+ (model.params.flatTo - model.params.flatFrom + 1) +' файлов'))
                    model.flats_by_group.forEach(function(flat) {
                        if ((!model.params.flatFrom && !model.params.flatTo) || 
                           ((model.params.flatFrom <= flat.lc_flatnumber) && (model.params.flatTo >= flat.lc_flatnumber)))
                                processSingleFlat(aPrint, flat.lc_flat_id);
                    });
                }
            else {
                repBill.model.params.parDateID = self.params.parDateID;
                repBill.model.params.parGroupID = self.params.GroupID; 
                repBill.model.params.parAccountID = self.params.AccountID;
                if (aPrint) 
                    repBill.print();
                else
                    repBill.show();
            }
        }
    }
    
    function processSingleFlat(aPrint, aFlatID) {
       // if (model.params.AccountID == 142486607303119){
            repBill.model.params.parDateID = self.params.parDateID;
            repBill.model.params.parFlatID = aFlatID; 
            repBill.model.params.parAccountID = self.params.AccountID;
            if (aPrint) 
                repBill.print();
            else
                repBill.show();
//        }
//        else{
//            repBillKapRemont.model.params.parDateID = self.params.parDateID;
//            repBillKapRemont.model.params.parFlatID = aFlatID; 
//            repBillKapRemont.model.params.parAccountID = self.params.AccountID;
//            if (aPrint) 
//                repBillKapRemont.print();
//            else
//                repBillKapRemont.show();
//        }
    }

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        process(false);        
    }//GEN-LAST:event_buttonActionPerformed

    function btnPrintActionPerformed(evt) {//GEN-FIRST:event_btnPrintActionPerformed
        process(true);
    }//GEN-LAST:event_btnPrintActionPerformed
    
    paramSynchronizer.addListener(this);
}
