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
        if (model.params.FlatID && !repBill.all_flats) {
            processSingleFlat(aPrint, model.params.FlatID);
        } else {
            if (!repBill.all_flats) {
                var flatsCount = 0;
                if(model.params.flatTo !== null && model.params.flatFrom !== null)
                    flatsCount = model.params.flatTo - model.params.flatFrom + 1;
                if(model.params.flatTo !== null && model.params.flatFrom == null)
                    flatsCount = model.params.flatTo;
                if(model.params.flatTo === null && model.params.flatFrom !== null)
                    flatsCount = model.flats_by_group.length - model.params.flatFrom + 1;
                if(model.params.flatTo === null && model.params.flatFrom === null)
                    flatsCount = model.flats_by_group.length;
                if (confirm('Вы собираетесь открыть '+ flatsCount +' файлов'))
                    model.flats_by_group.forEach(function(flat) {
                        if ((!model.params.flatFrom && !model.params.flatTo) || 
                           ((model.params.flatFrom <= flat.lc_flatnumber) && (model.params.flatTo >= flat.lc_flatnumber)))
                                processSingleFlat(aPrint, flat.lc_flat_id);
                    });
                }
            else {
                var number = 0;
                var flats = [];
                if(!model.params.FlatID){
                    if (model.params.flatFrom !== null){
                        var flatFrom = model.params.flatFrom-1;
                    }
                    else{
                        var flatFrom = 0;
                    }
                    if (model.params.flatTo !== null){
                        var flatTo = model.params.flatTo;
                    }
                    else{
                        var flatTo = model.flats_by_group.length;
                    }
                }
                else{
                    var flatFrom = 0;
                    var flatTo = 1;
                }
                for (var flat = flatFrom; flat < flatTo; flat ++){
                    flats.push({
                        lc_id: model.params.FlatID ? model.params.FlatID : model.flats_by_group[flat].lc_flat_id});
                    if (number !== 1 && flat !== flatTo-1){
                        number++;
                    }
                    else{
                        number = 0;
                        repBill.model.params.parDateID = self.params.parDateID;
                        repBill.model.params.parAccountID = self.params.AccountID;
                        repBill.flatToRender(flats);
                        if (aPrint) 
                            repBill.print();
                        else
                            repBill.show();
                        flats = [];
                    };
                };
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
