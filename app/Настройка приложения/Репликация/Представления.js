/**
 * @name ViewsView
 */
/*
 * @author AB
 * @module
 * @rolesAllowed admin
 */
function ViewsView() {

    var self = this, form = this, model = this.model;
    var replicateModule = new ServerModule("PublicReplicationAPI");
    model.dsSchemas.schema.f2.pk = true;
    model.dsViews.schema.tablename.pk = true;
    
function btnRefreshViewsActionPerformed(evt) {//GEN-FIRST:event_btnRefreshViewsActionPerformed
        model.dsSchemas.requery();
        model.dsViews.requery();
}//GEN-LAST:event_btnRefreshViewsActionPerformed

    function getCurrentView() {
        var viewName = '';
        if (!form.jcbViews.selected) {
            viewName = model.dsViews.cursor.tablename;
        }
        return viewName;
    }

    function getCurrentSchema() {
        var schemaName = '';
        if (!form.jcbSchemas.selected) {
            schemaName = model.dsSchemas.cursor.context;
        }
        return schemaName;
    }

function btnCreateViewActionPerformed(evt) {//GEN-FIRST:event_btnCreateViewActionPerformed
        var result = replicateModule.createView(getCurrentSchema(), getCurrentView());
        if (result.actionResult !== 0) {
            alert("Создание представления завершилось с ошибкой. Код операции " + result.actionId);
        }
}//GEN-LAST:event_btnCreateViewActionPerformed

function btnDropViewActionPerformed(evt) {//GEN-FIRST:event_btnDropViewActionPerformed
        var result = replicateModule.dropView(getCurrentSchema(), getCurrentView());
        if (result.actionResult !== 0) {
            alert("Удаление представления завершилось с ошибкой. Код операции " + result.actionId);
        }
}//GEN-LAST:event_btnDropViewActionPerformed

function jbCloseActionPerformed(evt) {//GEN-FIRST:event_jbCloseActionPerformed
        form.close();
}//GEN-LAST:event_jbCloseActionPerformed

function jcbSchemasItemStateChanged(evt) {//GEN-FIRST:event_jcbSchemasItemStateChanged
        form.grdSchemas.enabled = !form.jcbSchemas.selected;
}//GEN-LAST:event_jcbSchemasItemStateChanged

function jcbViewsItemStateChanged(evt) {//GEN-FIRST:event_jcbViewsItemStateChanged
        form.grdViews.enabled = !form.jcbViews.selected;
}//GEN-LAST:event_jcbViewsItemStateChanged
}