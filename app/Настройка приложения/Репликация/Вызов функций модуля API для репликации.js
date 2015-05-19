/**
 * 
 * @name ReplicatesAPIView
 * @author vy
 */
function ReplicatesAPIView() {
    var self = this;
    var replicateModule = new ReplicationAPI();
    
    function showResult(code) {
        if (code) {
            alert("Код завершения:"+code.actionResult+"\nId операции:"+code.actionId,"Операция завершена");
        } else {
            alert("Результат неизвестен","Операция завершена");
        }
    }
    
    function refreshDefineViews() {
        var model = self.model;
        model.dsViews.requery();
        model.dsRemoveDefine.requery();
    }

    function btnDropSchemaActionPerformed(evt) {//GEN-FIRST:event_btnDropSchemaActionPerformed
        if (!confirm("Данная операция не может быть отменена !!!\nПродолжить?","Внимание !!!")) return;
        showResult(replicateModule.dropSchema(self.model.params.pSchema));
    }//GEN-LAST:event_btnDropSchemaActionPerformed

    function btnCreateSchemaActionPerformed(evt) {//GEN-FIRST:event_btnCreateSchemaActionPerformed
        showResult(replicateModule.createSchema(self.txtCreateSchema.text));
    }//GEN-LAST:event_btnCreateSchemaActionPerformed

    function btnCreateViewActionPerformed(evt) {//GEN-FIRST:event_btnCreateViewActionPerformed
        showResult(replicateModule.createView(self.model.params.pViewSchema,self.model.params.pView));
    }//GEN-LAST:event_btnCreateViewActionPerformed

    function btnDropViewActionPerformed(evt) {//GEN-FIRST:event_btnDropViewActionPerformed
        showResult(replicateModule.dropView(self.model.params.pViewSchema,self.model.params.pView));
    }//GEN-LAST:event_btnDropViewActionPerformed

    function btnCreateSequenceActionPerformed(evt) {//GEN-FIRST:event_btnCreateSequenceActionPerformed
        showResult(replicateModule.createSequence(self.model.params.pSequenceSchema,self.model.params.pSequence));
    }//GEN-LAST:event_btnCreateSequenceActionPerformed

    function btnDropSequenceActionPerformed(evt) {//GEN-FIRST:event_btnDropSequenceActionPerformed
        showResult(replicateModule.dropSequence(self.model.params.pSequenceSchema,self.model.params.pSequence));
    }//GEN-LAST:event_btnDropSequenceActionPerformed

    function btnAddDefineActionPerformed(evt) {//GEN-FIRST:event_btnAddDefineActionPerformed
        var typ = 0;
        if (self.rbAllRW.selected) {
            typ = 1;
        } else if (self.rbOwnerRW.selected) {
            typ = 2;
        };
        showResult(replicateModule.addViewDefine(self.txtAddDefine.text,typ,(self.chkRecreateAll.selected?1:0)));
        refreshDefineViews();
    }//GEN-LAST:event_btnAddDefineActionPerformed

    function btnRemoveDefineActionPerformed(evt) {//GEN-FIRST:event_btnRemoveDefineActionPerformed
        showResult(replicateModule.removeViewDefine(self.model.params.pRemoveDefine,(self.chkRemoveAll.selected?1:0)));
        refreshDefineViews();
    }//GEN-LAST:event_btnRemoveDefineActionPerformed
}
