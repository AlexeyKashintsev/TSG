/**
 * 
 * @author Alexey
 * @name fmDateSelector
 * @public
 */

function fmDateSelector() {


var self = this, model = self.model;


var scrolled = false;
var changed = false;
self.parentForm = null;
var deForm = null;


function btn_prevActionPerformed(evt) {//GEN-FIRST:event_btn_prevActionPerformed
    self.all_dates.prev(); 
}//GEN-LAST:event_btn_prevActionPerformed

function all_datesOnScrolled(evt) {//GEN-FIRST:event_all_datesOnScrolled
    if (!changed){
        self.parDateID = self.all_dates.per_date_id;
        self.parEditDate = self.all_dates.edit_date;
        scrolled =  true;}
    else {
        changed = false;}
       
    if (self.all_dates.rowIndex == 1)
        self.btn_prev.enabled = false;
    else self.btn_prev.enabled = true;
    
    if (self.all_dates.rowIndex == self.all_dates.length )
        self.btn_last.enabled = self.btn_next.enabled = false;
    else self.btn_last.enabled = self.btn_next.enabled = true;
    setDate(self.parDateID);
    setEditDate(self.parEditDate);
}//GEN-LAST:event_all_datesOnScrolled

function btn_nextActionPerformed(evt) {//GEN-FIRST:event_btn_nextActionPerformed
    self.all_dates.next();
}//GEN-LAST:event_btn_nextActionPerformed

function btn_lastActionPerformed(evt) {//GEN-FIRST:event_btn_lastActionPerformed
    model.all_dates.last();
}//GEN-LAST:event_btn_lastActionPerformed

function paramsOnChanged(evt) {//GEN-FIRST:event_paramsOnChanged
    if (!scrolled){
        changed =  true; 
        self.all_dates.scrollTo(self.all_dates.findById(self.parDateID));
           }
        else 
        scrolled = false;
        
    if (self.all_dates.rowIndex == 1)
        self.btn_prev.enabled = false;
    else self.btn_prev.enabled = true;
    
    if (self.all_dates.rowIndex == self.all_dates.length )
        self.btn_last.enabled = self.btn_next.enabled = false;
    else self.btn_last.enabled = self.btn_next.enabled = true;
    
    setDate(self.parDateID);         
}//GEN-LAST:event_paramsOnChanged

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    model.all_dates.last();
    all_datesOnScrolled(evt);
}//GEN-LAST:event_formWindowOpened

function btn_newActionPerformed(evt) {//GEN-FIRST:event_btn_newActionPerformed
    /*self.all_dates.last();
    var lastDate = self.all_dates.per_date;
    self.all_dates.insert(self.all_dates.schema.per_date, lastDate.setMonth(lastDate.getMonth()+1));
    //self.all_dates.scrollTo(self.all_dates.findById(self.all_dates.per_date_id));
    scrolled = false;
    self.parDateID = self.all_dates.per_date_id;
    self.model.save();
    self.model.requery();
    self.all_dates.last();*/
    var newDateProcessor = new DateModule();
    newDateProcessor.newDate(function(){
        self.model.requery(function(){
            model.all_dates.last();
        });
    });
}//GEN-LAST:event_btn_newActionPerformed

function setDate(aNewDateID){
    if (self.parentForm) return self.parentForm.setDate(aNewDateID)
    else return true;
}

function setEditDate(aEditDate){
    if (self.parentForm) return self.parentForm.setEditDate(aEditDate)
    else return true;
}

    function btn_confActionPerformed(evt) {//GEN-FIRST:event_btn_confActionPerformed
        if (!deForm) {
            deForm = new PeriodicSettings();
        }
        deForm.DateID = self.model.all_dates.per_date_id;
        deForm.model.requery(deForm.showModal);
    }//GEN-LAST:event_btn_confActionPerformed
}