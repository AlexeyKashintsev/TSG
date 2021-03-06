/**
 * 
 * @author Алексей
 * @name formServicesInGroup
 * @public
 */

function formServicesInGroup() {


var self = this, model = self.model;


self.isSelectForm = false;
self.isEditable = true;
var canSetEdit = false;
var grpMod = new ServerModule('groups_module');

self.setModifying = function(aModifying){
    self.mgUslugi.colModService.visible = aModifying;
    self.mgUslugi.colCalcType.visible = !aModifying;
};

function setEdit(){
    self.mgUslugi.editable = self.btnAdd.enabled = 
            self.btnDel.enabled = self.btnSave.enabled = self.isEditable;    
    //tbSetEdit.visible = canSetEdit;
    //tbSetEdit.selected = isEditable;
}

function setElShown(){
    setEdit();
    if (!self.isSelectForm){
        //pnlSelLock.visible = false;
        self.pnlWorkSpace.height += 48;
        self.mgUslugi.bottom += 48;
    }
}

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
    model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
    model.save();
}//GEN-LAST:event_btnSaveActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    setElShown();
}//GEN-LAST:event_formWindowOpened

function colCalcTypeOnSelect(aEditor) {//GEN-FIRST:event_colCalcTypeOnSelect
    var fmSelectCalcType = new Form('fmCalcType');
    var res = null;
    fmSelectCalcType.isSelectForm = true;
    fmSelectCalcType.showModal(function(aValue){
        self.dsServices.calc_id = aValue;
    });
}//GEN-LAST:event_colCalcTypeOnSelect

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
    var fmServSelector = new ServicesForm();
    fmServSelector.showModal(function(aService){
        if (aService){
            model.dsServices.insert(model.dsServices.schema.group_id , self.parGroup,
                                     model.dsServices.schema.services_id, aService.service,
                                     model.dsServices.schema.account_id, self.parAccountID);
            if (aService.calc_by_counter === true){
                model.dsGrpServiceCounter.push({
                grp_service_id:     model.dsServices.grp_services_id,
                counter_name:       'Общий'
            });}
            model.save();
            grpMod.addService2Flats(self.parGroup, aService.service, null, self.parAccountID, model.dsGrpServiceCounter.grp_service_counters_id);
         }
    });
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
    self.dsServices.delete();
}//GEN-LAST:event_btnDelActionPerformed

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
    if (model.modified&&confirm('Сохранить изменения?')){
        model.save();
    }
}//GEN-LAST:event_formWindowClosing

function btnUpActionPerformed(evt) {//GEN-FIRST:event_btnUpActionPerformed
    if (self.dsServices.rowIndex != 1){
        var services_id = self.dsServices.grp_services_id;
        self.dsServices.grp_services_id = 0;
        self.dsServices.prev();
        var prev_services_id = self.dsServices.grp_services_id;
        self.dsServices.grp_services_id = services_id;
        self.dsServices.next();
        self.dsServices.grp_services_id = prev_services_id;
        model.save();
        self.dsServices.requery(function(){
            self.dsServices.scrollTo(self.dsServices.findById(prev_services_id));
            self.mgUslugi.makeVisible(self.dsServices.cursor);
        });
    }
}//GEN-LAST:event_btnUpActionPerformed

function btnDownActionPerformed(evt) {//GEN-FIRST:event_btnDownActionPerformed
if (self.dsServices.rowIndex != self.dsServices.length)
    {
    var services_id = self.dsServices.grp_services_id;
    self.dsServices.grp_services_id = 0;
    self.dsServices.next();
    var next_services_id = self.dsServices.grp_services_id;
    self.dsServices.grp_services_id = services_id;
    self.dsServices.prev();
    self.dsServices.grp_services_id = next_services_id;
    model.save();
    self.dsServices.requery(function(){
            self.dsServices.scrollTo(self.dsServices.findById(next_services_id));
            self.mgUslugi.makeVisible(self.dsServices.cursor);
        });
    }
}//GEN-LAST:event_btnDownActionPerformed


    function colModServiceOnSelect(aEditor) {//GEN-FIRST:event_colModServiceOnSelect
        var fmSelectCalcType = new Form('fmCalcType');
        var res = null;
        fmSelectCalcType.isSelectForm = true;
        fmSelectCalcType.showModal(function(aValue){
            self.dsServices.calc_id = aValue;
        });
    }//GEN-LAST:event_colModServiceOnSelect

    function mgUslugiOnRender(evt) {//GEN-FIRST:event_mgUslugiOnRender

    }//GEN-LAST:event_mgUslugiOnRender

    paramSynchronizer.addListener(this);

    function btnServicesActionPerformed(evt) {//GEN-FIRST:event_btnServicesActionPerformed
        var fmServCount = new formServiceCounters();
        fmServCount.model.params.parGroup = model.params.parGroup;
        fmServCount.model.params.parService = model.dsServices.services_id;
        fmServCount.model.params.parGrpServ = model.dsServices.grp_services_id;
        fmServCount.model.dsGrpServiceCounter.requery();
        fmServCount.showModal(function(aRow){
            
        });
    }//GEN-LAST:event_btnServicesActionPerformed
}