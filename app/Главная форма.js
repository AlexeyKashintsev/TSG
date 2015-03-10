/**
 * 
 * @author Alexey
 * @name main_form
 * @public
 */

function main_form() {


var self = this, model = self;


    guiUtils = new guiModule();
    var fmDateSelect = new fmDateSelector;
    var fmWorksheet = null;
    var fmGroups = null;
    var fmDebt = null;
    var fmOplSessions = null;
    var fmServices = null;
    var fmWorkFlat = null;
    var fmGroupSelector = null;
    var fmReportPrint = null;
    var mf = this;
    
    function ParamsSynchronizer() {
        var date = 0;
        var dateEditable = true;
        var account = 0;
        
        var listeners = [];
        
        function checkForModifications() {
            var ok = true;
            for (var j in listeners) {
                try {
                    if (listeners[j].model.modified && 
                            !listeners[j].ignoreChanges)
                        ok = false;
                } catch (e) {
                    Logger.info('Листенер отвалился ;( ' + e);
                }
            }
            return ok || confirm('Изменения будут потеряны, продолжить?');
        }
        
        function syncParams(aListener) {
            try {
                if(aListener.syncParams)
                    aListener.syncParams(date, dateEditable, account);
                else {
                if (aListener.model.params) {
                    if (!aListener.doNotSetDate)
                        aListener.model.params.parDateID = date;
                    if (!aListener.doNotSetAccount)
                        aListener.model.params.parAccountID = account;
                }
                if (aListener.setEditable)
                    aListener.setEditable(dateEditable);
                if (aListener.setDate)
                    aListener.setDate(date);
                if (aListener.setAccount)
                    aListener.setAccount(account);
                }
                return true;
            } catch (e) {
                Logger.info('Листенер отвалился ;( ' + e);
                return false;
            }
        }
        
        this.addListener = function(aListener) {
            if (syncParams(aListener))
                listeners.push(aListener);
        };
        
        this.setDate = function(aNewDate, anIsEditable) {
            if (checkForModifications()) {
                date = aNewDate;
                dateEditable = anIsEditable;
                for (var j in listeners)
                    syncParams(listeners[j]);
                return true;
            } else 
                return false;
        };
        
        this.setAccount = function(aNewAccount) {
            if (checkForModifications()) {
                account = aNewAccount;
                for (var j in listeners)
                    syncParams(listeners[j]);
                return true;
            } else 
                return false;
        };
        
        this.getData = function() {
            return date;
        };
        
        this.getDataEditable = function() {
            return dateEditable;
        };
        
        this.getAccount = function() {
            return account;
        };
        
        this.getParams = function() {
            return {
                date        :   date,
                isEditable  :   dateEditable,
                account     :   account
            };
        };
    }
    
    paramSynchronizer = new ParamsSynchronizer();
    
    function showFormAsModal(formId)
    {
        modalForm = new Form(formId);
        modalForm.showModal();
}

self.showFormAsInternal = function(aForm) {
        var frameRunner = aForm;
        var lenCookie = guiUtils.beginLengthyOperation(this);
        try{
            frameRunner.desktop = self.formDesktop;
            frameRunner.showInternalFrame(self.formDesktop);

        }finally{
            lenCookie.end();
        }
        frameRunner.toFront();
}

function buttonActionPerformed(evt) {//GEN-FIRST:event_buttonActionPerformed
    if (!fmWorksheet) {
        fmWorksheet = new mainWorkSheet();
        fmWorksheet.mainForm = mf;
        self.showFormAsInternal(fmWorksheet);            
    } else self.showFormAsInternal(fmWorksheet);
}//GEN-LAST:event_buttonActionPerformed

function button1ActionPerformed(evt) {//GEN-FIRST:event_button1ActionPerformed
    if (!fmDebt) {
        fmDebt = new debt_in_group();
        fmDebt.mainForm = mf;
        self.showFormAsInternal(fmDebt);             
    } else self.showFormAsInternal(fmDebt);
}//GEN-LAST:event_button1ActionPerformed

function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
    model.all_dates.last();
    model.params.parDateID = self.all_dates.per_date_id;
    model.params.parEditDate = self.all_dates.edit_date;
    model.dsAllAccounts.first();
    model.params.parAccountID = model.dsAllAccounts.grp_account_id;
    fmDateSelect.parentForm = mf;
    fmDateSelect.showOnPanel(self.pnlDateSelector);
}//GEN-LAST:event_formWindowOpened

function paramsOnChanged(evt) {//GEN-FIRST:event_paramsOnChanged
    paramSynchronizer.setAccount(model.params.parAccountID);
    if (fmWorksheet) fmWorksheet.setGroup(fmWorksheet.params.parGroupID, fmWorksheet.params.parFlatID);
        //self.setAccount();
}//GEN-LAST:event_paramsOnChanged

function button2ActionPerformed(evt) {//GEN-FIRST:event_button2ActionPerformed
    if (!fmOplSessions) {
        fmOplSessions = new opl_session_view();
        fmOplSessions.mainForm = mf;
        self.showFormAsInternal(fmOplSessions);        
    } else self.showFormAsInternal(fmOplSessions);
}//GEN-LAST:event_button2ActionPerformed

function button3ActionPerformed(evt) {//GEN-FIRST:event_button3ActionPerformed
    if (!fmServices) {
        fmServices = new ServicesForm();
        fmServices.mainForm = mf;
        self.showFormAsInternal(fmServices);       
    }	else self.showFormAsInternal(fmServices);
}//GEN-LAST:event_button3ActionPerformed




    function button4ActionPerformed(evt) {//GEN-FIRST:event_button4ActionPerformed
        fmReportPrint = new ReportPrint();
        self.showFormAsInternal(fmReportPrint);
    }//GEN-LAST:event_button4ActionPerformed

    function flats_by_groupOnScrolled(evt) {//GEN-FIRST:event_flats_by_groupOnScrolled
        /*if (self.flats_by_group.next()){
            var repBill = new aaa_1();
            repBill.model.params.parDateID = self.parDateID;
            repBill.model.params.parFlatID = self.flats_by_group.lc_flat_id;//aGroup;
            repBill.print();
        }*/
    }//GEN-LAST:event_flats_by_groupOnScrolled

    function button5ActionPerformed(evt) {//GEN-FIRST:event_button5ActionPerformed
        fmWorkFlat = new mainWorkFlat();
        fmWorkFlat.mainForm = mf;        
        self.showFormAsInternal(fmWorkFlat);
    }//GEN-LAST:event_button5ActionPerformed

    function button6ActionPerformed(evt) {//GEN-FIRST:event_button6ActionPerformed
        var fmAccountSel = new formAccountParams();
        fmAccountSel.selector = true;
        fmAccountSel.mainForm = mf;
        self.showFormAsInternal(fmAccountSel); 
    }//GEN-LAST:event_button6ActionPerformed
}

