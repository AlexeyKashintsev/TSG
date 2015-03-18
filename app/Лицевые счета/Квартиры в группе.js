/**
 * 
 * @author Алексей
 * @name FlatsInGroup
 * @public
 */

function FlatsInGroup() {


    var self = this, model = self.model;

    self.isSelectForm = true;
    self.isEditable = false;
    self.canSetEdit = true;
    self.parentForm = null;
    self.mainForm = null;
    var flatModule = new LCModule();
    var fmIssuesByFlat = new formLcIssues();
    var Flat = null;


    self.setCurrentGroup = function(aNewGroupID) {
        self.parGroupID = aNewGroupID;
        return self.issues_by_group.lc_flat_id;
    };

    self.checkIfPossibleToChangeFlat = function() {
        return self.parentForm.check4Modifications();
    };

    self.setCurrentFlat = function(aNewFlatID) {
        self.parentForm.setFlat(aNewFlatID);
    };

    function setEdit() {
        self.modelGrid.editable = self.btnAdd.enabled =
                self.btnDel.enabled = self.btnSave.enabled = self.isEditable;
        self.tbSetEdit.visible = self.canSetEdit;
        self.tbSetEdit.selected = self.isEditable;
    }

    function setElShown() {
        setEdit();
        if (!self.isSelectForm) {
            self.pnlSelLock.visible = false;
        }
    }

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
        if (self.model.modified && confirm('Сохранить изменения?')) {
            self.model.save();
        }
        self.model.requery();
}//GEN-LAST:event_btnReqActionPerformed

function btnSaveActionPerformed(evt) {//GEN-FIRST:event_btnSaveActionPerformed
        self.model.save();
}//GEN-LAST:event_btnSaveActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
        setElShown();
}//GEN-LAST:event_formWindowOpened

function tbSetEditActionPerformed(evt) {//GEN-FIRST:event_tbSetEditActionPerformed
        self.isEditable = self.tbSetEdit.selected;
        setEdit();
}//GEN-LAST:event_tbSetEditActionPerformed

function formWindowClosing(evt) {//GEN-FIRST:event_formWindowClosing
        if (self.model.modified && confirm('Сохранить изменения?')) {
            self.model.save();
        }
}//GEN-LAST:event_formWindowClosing

function btnAddActionPerformed(evt) {//GEN-FIRST:event_btnAddActionPerformed
//    self.dsflats_by_group.insert(self.dsflats_by_group.schema.lc_group, parGroup);
        flatModule.parDateID = self.parDateID;
        flatModule.addNewLC('', '', 0, self.parGroupID);
        self.issues_by_group.requery();
}//GEN-LAST:event_btnAddActionPerformed

function btnDelActionPerformed(evt) {//GEN-FIRST:event_btnDelActionPerformed
        self.issues_by_group.deleteRow();
}//GEN-LAST:event_btnDelActionPerformed

    function modelGridMouseClicked(evt) {//GEN-FIRST:event_modelGridMouseClicked
        self.setCurrentFlat(self.issues_by_group.lc_flat_id);
        model.params.parFlatID = Flat = self.issues_by_group.lc_flat_id;
    }//GEN-LAST:event_modelGridMouseClicked


    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        fmIssuesByFlat.mainForm = self.mainForm;
        fmIssuesByFlat.parentForm = self;
        if (self.issues_by_group.lc_flat_id === null)
            alert('Выберите квартиру');
        else {
            if (model.issues_by_group.type_issues == null) {
                model.issues_by_flat.push({
                    date_id : model.params.parDateID,
                    lc_id: model.issues_by_group.lc_flat_id,
                    group_id: model.params.parGroupID,
                    type_issues: 10,
                    issue_comment: ' '
                });
                self.model.save();
            }              

                fmIssuesByFlat.model.params.parDate = model.params.parDateID;
                fmIssuesByFlat.model.params.parGroup = model.params.parGroupID;
                fmIssuesByFlat.model.params.parFlat = model.issues_by_group.lc_flat_id;
                fmIssuesByFlat.setBtnVisible();
                self.model.requery();
                if (self.mainForm)
                    self.mainForm.showFormAsInternal(fmIssuesByFlat);
                else
                    fmIssuesByFlat.show();
            }
        
    }//GEN-LAST:event_buttonActionPerformed

    function modelGridOnRender(evt) {//GEN-FIRST:event_modelGridOnRender
        if (evt.object.completed != true)
        {
            switch (evt.object.type_issues) {
                case 30:
                    {
                        evt.cell.style.background = Color(255, 100, 50);
                        break;
                    }
                case 20:
                    {
                        evt.cell.style.background = Color(0, 155, 205);
                        break;
                    }
                case 10:
                    {
                        evt.cell.style.background = Color(83, 230, 119);
                        break;
                    }
            }
        }
    }//GEN-LAST:event_modelGridOnRender

    paramSynchronizer.addListener(this);

    function issues_by_groupOnRequeried(evt) {//GEN-FIRST:event_issues_by_groupOnRequeried
        try {
            model.issues_by_group.scrollTo(model.issues_by_group.findById(model.params.parFlatID));
        } finally {
        };
    }//GEN-LAST:event_issues_by_groupOnRequeried

    function issues_by_groupOnScrolled(evt) {//GEN-FIRST:event_issues_by_groupOnScrolled
        self.setCurrentFlat(self.issues_by_group.lc_flat_id);
        model.params.parFlatID = Flat = self.issues_by_group.lc_flat_id;  
    }//GEN-LAST:event_issues_by_groupOnScrolled
}