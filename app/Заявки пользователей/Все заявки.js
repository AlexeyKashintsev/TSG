/**
 * 
 * @author TSG
 */
function AllApplications() {
    var self = this, model = this.model, form = this;
    var fmApplication = new formApplicationByFlat();
    
    self.check = function(){
        model.allApplication.requery();
        if (model.allApplication.length == 0){
            self.textField.text = 'В настоящее время нет новых заявок';
            self.textField.visible = true;
            self.modelGrid.visible = false;
        }
        else {
           self.textField.visible = false;
            self.modelGrid.visible = true; 
        }; 
    }

    function formWindowOpened(evt) {//GEN-FIRST:event_formWindowOpened
        self.check();
    }//GEN-LAST:event_formWindowOpened

    function modelGridMouseClicked(evt) {//GEN-FIRST:event_modelGridMouseClicked
        if (evt.clickCount > 1){
            fmApplication.mainForm = self.mainForm;
            fmApplication.parentForm = self;            
            fmApplication.model.params.parFlat = self.allApplication.lc_flat_id;
            self.mainForm.showFormAsInternal(fmApplication);
        }
    }//GEN-LAST:event_modelGridMouseClicked
}
