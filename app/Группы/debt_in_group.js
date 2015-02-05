/**
 * 
 * @author TSG
 * @name debt_in_group
 * @public
 */
function debt_in_group() {
    var self = this, model = this.model, form = this;
    
    model.flats_by_group.filter(function(row){
        if (row.dolg > 1000)
            return true;
        else
            return false;
    });
}
