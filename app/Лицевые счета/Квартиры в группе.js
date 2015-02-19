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


self.setCurrentGroup = function(aNewGroupID){
    self.parGroupID = aNewGroupID;
    return self.issues_by_group.lc_flat_id;
};

self.checkIfPossibleToChangeFlat = function(){
    return self.parentForm.check4Modifications();
};

self.setCurrentFlat = function(aNewFlatID){
    self.parentForm.setFlat(aNewFlatID);
};

function setEdit(){
    self.modelGrid.editable = self.btnAdd.enabled = 
            self.btnDel.enabled = self.btnSave.enabled = self.isEditable;    
    self.tbSetEdit.visible = self.canSetEdit;
    self.tbSetEdit.selected = self.isEditable;
}

function setElShown(){
    setEdit();
    if (!self.isSelectForm){
        self.pnlSelLock.visible = false;
    }
}

function btnReqActionPerformed(evt) {//GEN-FIRST:event_btnReqActionPerformed
    if (self.model.modified&&confirm('Сохранить изменения?')){
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
    if (self.model.modified&&confirm('Сохранить изменения?')){
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
        Flat = self.issues_by_group.lc_flat_id;
    }//GEN-LAST:event_modelGridMouseClicked

    function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
        fmIssuesByFlat.mainForm = self.mainForm;
        fmIssuesByFlat.parentForm = self;
        if(self.issues_by_group.lc_flat_id == null)
            alert('Выберите квартиру')
        else{
                if(self.model.issues_by_group.adm_issues_id == null )
                {
                    model.issues_by_flat.insert(self.issues_by_flat.schema.date_id, self.model.params.parDateID,
                                        self.issues_by_flat.schema.lc_id,self.issues_by_group.lc_flat_id,
                                        self.issues_by_flat.schema.group_id,self.model.params.parGroupID,
                                        self.issues_by_flat.schema.type_issues, 142253837403191,
                                        self.issues_by_flat.schema.issue_comment, '');
                    self.model.save();
                    fmIssuesByFlat.model.params.parDate = self.model.params.parDateID;
                    fmIssuesByFlat.model.params.parFlat = self.model.issues_by_group.lc_flat_id;
                    fmIssuesByFlat.model.params.parGroup = self.model.params.parGroupID;
                    self.model.requery();
                    fmIssuesByFlat.model.requery();
                    fmIssuesByFlat.setBtnVisible();
                    if (self.mainForm)
                        self.mainForm.showFormAsInternal(fmIssuesByFlat);
                    else
                        fmIssuesByFlat.show();                  
                }
                else
                {
                    fmIssuesByFlat.model.params.parDate = self.model.params.parDateID;
                    fmIssuesByFlat.model.params.parGroup = self.model.params.parGroupID;
                    fmIssuesByFlat.model.params.parFlat = self.model.issues_by_group.lc_flat_id;
                fmIssuesByFlat.setBtnVisible();    
                if (self.mainForm)
                        self.mainForm.showFormAsInternal(fmIssuesByFlat);
                    else
                        fmIssuesByFlat.show();
                }
            }
    }//GEN-LAST:event_buttonActionPerformed

    function modelGridOnRender(evt) {//GEN-FIRST:event_modelGridOnRender
        if (evt.object.completed != true )
        {
        switch (evt.object.type_issues) {
                case 142253840815610:{ 
                    evt.cell.style.background = Color(255, 100, 50);
                    break;}
                case 142253839110903:{                    
                    evt.cell.style.background = Color(0, 155, 205);
                    break;}
                case 142253837403191:{
                    evt.cell.style.background = Color(83, 230, 119);
                    break;}
                }
        }
        //self.issues_by_group.cursor = self.issues_by_group.findById(Flat)                
        //self.issues_by_group.scrollTo(self.issues_by_group.findById(Flat).lc_flat_id)
    }//GEN-LAST:event_modelGridOnRender

    paramSynchronizer.addListener(this);
}