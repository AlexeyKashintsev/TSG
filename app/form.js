/**
 * 
 * @author TSG
 */
function form() {
    var self = this, model = this.model, form = this;
    model.all_dates.requery();

        model.ds.requery();
    model.params.onChanged = function(event) {
        model.ds.requery();
    };
    
self.paramsOnChanged = function(evt){
    model.ds.requery();
};
}
