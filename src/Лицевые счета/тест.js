/**
 * 
 * @author Alexey
 * @name test
 * @public
 */

function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
    var tst = new ServerModule('LCModule');
   /* tst.doSomethingMine = function(){
        var e = model.createEntity("Select count(*) as cnt FROM per_date");
        e.execute();
        return e.cnt
    }*/

        var e = tst.model.createEntity("Select count(*) as cnt FROM per_date");
        e.execute();
        return e.cnt;
    label.text =  e.cnt;//doSomethingMine();
}//GEN-LAST:event_buttonActionPerformed
