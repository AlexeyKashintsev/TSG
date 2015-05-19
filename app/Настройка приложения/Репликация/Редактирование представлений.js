/**
 * @name ViewsEditorView
 */
/*
 * @author AB
 * @module
 * @rolesAllowed admin
 */
function ViewsEditorView() {

    var self = this, form = this, model = this.model;
    var replicateModule = new ServerModule("PublicReplicationAPI");
    var READ_ONLY_ALL = 0;
    var READ_WRITE_ALL = 1;
    var READ_WRITE_USER = 2;
    model.dsNotDefinedViews.schema.id.pk = true;
    model.dsViews.schema.tablename.pk = true;
    
    function getCurrentView() {
        return  model.dsViews.cursor.tablename;
    }

    function defineView(aViewName, aViewType, aCheckAllUsers) {
        if (aViewName) {
            if (!aViewType) {
                aViewType = 0;
            }
            var result = replicateModule.addViewDefine(aViewName, aViewType, aCheckAllUsers);
            if (result.actionResult !== 0) {
                alert("Создание описания view  завершилось с ошибкой. Код операции " + result.actionId);
            }
        }
    }

    function updateView(aViewName, aViewType, aCheckAllUsers) {
        if (aViewName && confirm("Операция изменения описания представления " + aViewName + " не может быть отменена !!!\nПродолжить?", "Внимание !!!")) {
            if (!aViewType) {
                aViewType = 0;
            }
            var result = replicateModule.addViewDefine(aViewName, aViewType, aCheckAllUsers);
            if (result.actionResult !== 0) {
                alert("Изменение описания представления " + aViewName + " завершилось с ошибкой. Код операции " + result.actionId);
            }
        }
    }

function jbCloseActionPerformed(evt) {//GEN-FIRST:event_jbCloseActionPerformed
        self.close();
}//GEN-LAST:event_jbCloseActionPerformed

function jbEditRActionPerformed(evt) {//GEN-FIRST:event_jbEditRActionPerformed
        updateView(getCurrentView(), READ_ONLY_ALL, form.jcbEditAll.selected);
}//GEN-LAST:event_jbEditRActionPerformed

function jbDeleteActionPerformed(evt) {//GEN-FIRST:event_jbDeleteActionPerformed
        var viewName = getCurrentView();
        if (viewName && confirm("Операция удаления описания представления " + viewName + " не может быть отменена !!!\nПродолжить?", "Внимание !!!")) {
            var result = replicateModule.removeViewDefine(viewName, form.jcbEditAll.selected);
            if (result.actionResult !== 0) {
                alert("Удаление описания представления " + viewName + " завершилось с ошибкой. Код операции " + result.actionId);
            }
        }
}//GEN-LAST:event_jbDeleteActionPerformed

function jbAddRActionPerformed(evt) {//GEN-FIRST:event_jbAddRActionPerformed
        defineView(model.dsNotDefinedViews.tablename, READ_ONLY_ALL, form.jcbCreateAll.selected);
}//GEN-LAST:event_jbAddRActionPerformed

function jbAddRWActionPerformed(evt) {//GEN-FIRST:event_jbAddRWActionPerformed
        defineView(model.dsNotDefinedViews.tablename, READ_WRITE_ALL, form.jcbCreateAll.selected);
}//GEN-LAST:event_jbAddRWActionPerformed

function jbAddRWUserActionPerformed(evt) {//GEN-FIRST:event_jbAddRWUserActionPerformed
        defineView(model.dsNotDefinedViews.tablename, READ_WRITE_USER, form.jcbCreateAll.selected);
}//GEN-LAST:event_jbAddRWUserActionPerformed

function jbEditRWUserActionPerformed(evt) {//GEN-FIRST:event_jbEditRWUserActionPerformed
        updateView(getCurrentView(), READ_WRITE_USER, form.jcbEditAll.selected);
}//GEN-LAST:event_jbEditRWUserActionPerformed

function jbEditRWActionPerformed(evt) {//GEN-FIRST:event_jbEditRWActionPerformed
        updateView(getCurrentView(), READ_WRITE_ALL, form.jcbEditAll.selected);
}//GEN-LAST:event_jbEditRWActionPerformed

function btnRefreshViews1ActionPerformed(evt) {//GEN-FIRST:event_btnRefreshViews1ActionPerformed
        model.dsViews.requery();
}//GEN-LAST:event_btnRefreshViews1ActionPerformed

    function btnRefreshViewsActionPerformed(evt) {//GEN-FIRST:event_btnRefreshViewsActionPerformed
        model.dsNotDefinedViews.requery();
    }//GEN-LAST:event_btnRefreshViewsActionPerformed
}