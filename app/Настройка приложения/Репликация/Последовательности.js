/*
 * @author AB
 * @module
 * @rolesAllowed admin
 */
function SequencesView() {
    
    var self = this, form = this, model = this.model; 
    var replicateModule = new ServerModule("PublicReplicationAPI");
    model.dsSchemas.schema.f2.pk = true;
    model.dsSequences.schema.id.pk = true;
    
    function getCurrentSequence() {
        var sequenceName = '';
        if (!form.jcbSequences.selected) {
            sequenceName = model.dsSequences.cursor.sequencename;
        }
        return sequenceName;
    }

    function getCurrentSchema() {
        var schemaName = '';
        if (!form.jcbSchemas.selected) {
            schemaName = model.dsSchemas.cursor.context;
        }
        return schemaName;
    }

function btnCreateSequenceActionPerformed(evt) {//GEN-FIRST:event_btnCreateSequenceActionPerformed
        var result = replicateModule.createSequence(getCurrentSchema(), getCurrentSequence());
        if (result.actionResult !== 0) {
            alert("Создание последовательности  завершилось с ошибкой. Код операции " + result.actionId);
        }
}//GEN-LAST:event_btnCreateSequenceActionPerformed

function btnDropSequenceActionPerformed(evt) {//GEN-FIRST:event_btnDropSequenceActionPerformed
        var result = replicateModule.dropSequence(getCurrentSchema(), getCurrentSequence());
        if (result.actionResult !== 0) {
            alert("Удаление последовательности завершилось с ошибкой. Код операции " + result.actionId);
        }
}//GEN-LAST:event_btnDropSequenceActionPerformed

function btnRefreshActionPerformed(evt) {//GEN-FIRST:event_btnRefreshActionPerformed
        model.dsSchemas.requery();
        model.dsSequences.requery();
}//GEN-LAST:event_btnRefreshActionPerformed

function jbCloseActionPerformed(evt) {//GEN-FIRST:event_jbCloseActionPerformed
        form.close();
}//GEN-LAST:event_jbCloseActionPerformed

function jcbSchemasItemStateChanged(evt) {//GEN-FIRST:event_jcbSchemasItemStateChanged
        form.grdSchemas.enabled = !form.jcbSchemas.selected;
}//GEN-LAST:event_jcbSchemasItemStateChanged

function jcbSequencesItemStateChanged(evt) {//GEN-FIRST:event_jcbSequencesItemStateChanged
        form.grdSequences.enabled = !form.jcbSequences.selected;
}//GEN-LAST:event_jcbSequencesItemStateChanged
}