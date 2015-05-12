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
    var grpMod = new ServerModule('GroupsModule');
    var fmServCount = null;

    self.setModifying = function(aModifying) {
        self.mgUslugi.colModService.visible = aModifying;
        self.mgUslugi.colCalcType.visible = !aModifying;
    };

    function setEdit() {
        self.mgUslugi.editable = self.btnAdd.enabled =
                self.btnDel.enabled = self.btnSave.enabled = self.isEditable;
        //tbSetEdit.visible = canSetEdit;
        //tbSetEdit.selected = isEditable;
    }

    function setElShown() {
        setEdit();
        if (!self.isSelectForm) {
            //pnlSelLock.visible = false;
            self.pnlWorkSpace.height += 48;
            self.mgUslugi.bottom += 48;
        }
    }
    
    function applyChanges() {
        model.save();
        if (fmServCount)
            fmServCount.save();
        model.dsServices.forEach(function(cursor) {
            if (cursor.new_service) {
                grpMod.addService2Flats(cursor.group_id, cursor.services_id,
                                        null, cursor.account_id, model.dsServices.cursor.grp_services_id);
                cursor.new_service = false;
            }
        });
    }

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
        if (model.modified && confirm('Сохранить изменения?')) {
            applyChanges();
        }
        model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
        applyChanges();
}//GEN-LAST:event_btnSaveActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
        setElShown();
}//GEN-LAST:event_formWindowOpened

function colCalcTypeOnSelect(aEditor) {//GEN-FIRST:event_colCalcTypeOnSelect
        var fmSelectCalcType = new Form('fmCalcType');
        var res = null;
        fmSelectCalcType.isSelectForm = true;
        fmSelectCalcType.showModal(function(aValue) {
            self.dsServices.calc_id = aValue;
        });
}//GEN-LAST:event_colCalcTypeOnSelect

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
        var fmServSelector = new ServicesForm();
        fmServSelector.showModal(function(aService) {
            if (aService) {
                model.dsServices.push({
                    group_id:  model.params.parGroup,
                    services_id: aService.service,
                    account_id: self.parAccountID,
                    new_service: true
                });
                /*if (aService.calc_by_counter === true && confirm('Добавить счетчик "Общий"?')) {
                    model.dsGrpServiceCounter.push({
                        grp_service_id: model.dsServices.grp_services_id,
                        counter_name: 'Общий'
                    });
                }*/
                //model.save();
                //grpMod.addService2Flats(self.parGroup, aService.service, null, self.parAccountID, model.dsGrpServiceCounter.grp_service_counters_id);
            }
        });
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
        self.dsServices.delete();
}//GEN-LAST:event_btnDelActionPerformed

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
        if (model.modified && confirm('Сохранить изменения?')) {
            model.save();
        }
}//GEN-LAST:event_formWindowClosing

function btnUpActionPerformed(evt) {//GEN-FIRST:event_btnUpActionPerformed
        if (self.dsServices.rowIndex != 1) {
            var id = self.dsServices.grp_services_id;
            self.dsServices.cursor.usl_order = self.dsServices.rowIndex - 1;
            self.dsServices.prev();
            self.dsServices.cursor.usl_order = self.dsServices.rowIndex + 1;
            ;
            model.save();
            self.dsServices.requery(function() {
                self.dsServices.scrollTo(self.dsServices.findById(id));
                self.mgUslugi.makeVisible(self.dsServices.cursor);
            });
        }
}//GEN-LAST:event_btnUpActionPerformed

function btnDownActionPerformed(evt) {//GEN-FIRST:event_btnDownActionPerformed
        if (self.dsServices.rowIndex != self.dsServices.length) {
            var id = self.dsServices.grp_services_id;
            self.dsServices.cursor.usl_order = self.dsServices.rowIndex + 1;
            self.dsServices.next();
            self.dsServices.cursor.usl_order = self.dsServices.rowIndex - 1;
            model.save();
            self.dsServices.requery(function() {
                self.dsServices.scrollTo(self.dsServices.findById(id));
                self.mgUslugi.makeVisible(self.dsServices.cursor);
            });
        }
}//GEN-LAST:event_btnDownActionPerformed


    function colModServiceOnSelect(aEditor) {//GEN-FIRST:event_colModServiceOnSelect
        var fmSelectCalcType = new Form('fmCalcType');
        var res = null;
        fmSelectCalcType.isSelectForm = true;
        fmSelectCalcType.showModal(function(aValue) {
            self.dsServices.calc_id = aValue;
        });
    }//GEN-LAST:event_colModServiceOnSelect

    function mgUslugiOnRender(evt) {//GEN-FIRST:event_mgUslugiOnRender

    }//GEN-LAST:event_mgUslugiOnRender

    paramSynchronizer.addListener(this);

    function btnServicesActionPerformed(evt) {//GEN-FIRST:event_btnServicesActionPerformed
        if (!fmServCount)
            fmServCount = new formServiceCounters();
        fmServCount.setService(model.params.parGroup, model.dsServices.services_id, model.dsServices.grp_services_id);
        fmServCount.showModal(function(aModified) {
            model.dsServices.cursor.modified = model.dsServices.cursor.modified || aModified;
        });
    }//GEN-LAST:event_btnServicesActionPerformed

    function btnServices1ActionPerformed(evt) {//GEN-FIRST:event_btnServices1ActionPerformed
        // TODO Добавьте свой код:
    }//GEN-LAST:event_btnServices1ActionPerformed
}