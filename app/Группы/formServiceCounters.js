/**
 * 
 * @author postgres
 */
function formServiceCounters() {
    var self = this, model = this.model, form = this;
    var LCMod = new ServerModule('LCModule');
    var modCN = new ServerModule('CountersModule');
    // TODO : place your code here

    function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
        model.dsGrpServiceCounter.push({
            grp_service_id: model.params.parGrpServ
        });
        model.flats_by_group.requery();
        model.flats_by_group.forEach(function(aFlat){
            model.service_by_flat.params.flat_id = aFlat.lc_flat_id;
            model.services_by_flat.requery();
            var serv = model.services_by_flat.find(model.services_by_flat.schema.services_id, model.params.parService);
            var cnt = LCMod.addCounterToFlat(serv[0].lc_flat_services_id, model.dsGrpServiceCounter.grp_service_counters_id);
            modCN.setCounterValueByCounterValueID(cnt, model.params.parDateID, 0, 0);
        });
        //grpMod.addService2Flats(self.parGroup, self.parService, null, self.parAccountID, model.dsGrpServiceCounter.grp_service_counters_id);
    }//GEN-LAST:event_btnAddActionPerformed

    function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
    model.requery();
    }//GEN-LAST:event_btnReqActionPerformed

    function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    model.save();
    }//GEN-LAST:event_btnSaveActionPerformed

paramSynchronizer.addListener(this);
}

