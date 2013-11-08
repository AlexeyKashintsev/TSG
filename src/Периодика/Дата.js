/**
 * 
 * @author Alexey
 * @name fmDateSelector
 * @public
 */

var scrolled = false;
var changed = false;
var parentForm = null;


function btn_prevActionPerformed(evt) {//GEN-FIRST:event_btn_prevActionPerformed
    all_dates.prev(); 
}//GEN-LAST:event_btn_prevActionPerformed

function all_datesOnScrolled(evt) {//GEN-FIRST:event_all_datesOnScrolled
    if (!changed){
        parDateID = all_dates.per_date_id;
        scrolled =  true;}
    else {
        changed = false;}
       
    if (all_dates.rowIndex == 1)
        btn_prev.enabled = false;
    else btn_prev.enabled = true;
    
    if (all_dates.rowIndex == all_dates.length )
        btn_last.enabled = btn_next.enabled = false;
    else btn_last.enabled = btn_next.enabled = true;
    setDate(parDateID);
}//GEN-LAST:event_all_datesOnScrolled

function btn_nextActionPerformed(evt) {//GEN-FIRST:event_btn_nextActionPerformed
    all_dates.next();
}//GEN-LAST:event_btn_nextActionPerformed

function btn_lastActionPerformed(evt) {//GEN-FIRST:event_btn_lastActionPerformed
    all_dates.last();
}//GEN-LAST:event_btn_lastActionPerformed

function paramsOnChanged(evt) {//GEN-FIRST:event_paramsOnChanged
    if (!scrolled){
        all_dates.scrollTo(all_dates.findById(parDateID));
        changed =  true;}
    else {
        scrolled = false;
    }    
}//GEN-LAST:event_paramsOnChanged

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    all_dates.last();
    all_datesOnScrolled(evt);
}//GEN-LAST:event_formWindowOpened

function btn_newActionPerformed(evt) {//GEN-FIRST:event_btn_newActionPerformed
    all_dates.last();
    var lastDate = all_dates.per_date;
    all_dates.insert(all_dates.md.per_date, lastDate.setMonth(lastDate.getMonth()+1));
    scrolled = false;
    parDateID = all_dates.per_date_id;
    model.save();
    model.requery();
}//GEN-LAST:event_btn_newActionPerformed

function setDate(aNewDateID){
    if (parentForm) return parentForm.setDate(aNewDateID);
    else return true;
}