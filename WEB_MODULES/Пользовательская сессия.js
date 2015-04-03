/**
 * @author Алексей
 * @public
 * @module
 */ 
function UserSession() {
    var self = this, model = this.model;
    
        self.actionList = {
        common          :   {
            display     :   "Дашборд",
            dispForm    :   "TradePointsDashboard",
            selfGeneration  :   true,
            defEnabled  :   true
        },
        /*buyItems        :   {
            display     :   "Заказ товаров",
            dispForm    :   "BuyItemsForm"
        },
        historyOrders        :   {
            display     :   "История заказов",
            dispForm    :   "HistoryOrders"
        },*/
        tradePositions  :   {
            display     :   "Номенклатура товаров",
            dispForm    :   "ItemsForTrade"
        },
        tradeModifiers  :   {
            display     :   "Дополнительные справочники",
            dispForm    :   "TradeItemsModifiersValues"
        },
        suppliers       :   {
            display     :   "Поставщики",
            dispForm    :   "SuppliersForm"
        },
        users           :   {
            display     :   "Пользователи",
            dispForm    :   "FranchaziUsers"
        },
        billAndServices :   {
            display     :   "Счета и услуги",
            dispForm    :   "BillsFranchazi"
        }
    };
    
    self.actionListDisplay = new wf.ActionList(self.actionList, document.getElementById("actionPanel"));
    
    self.getUserName = function() {
        return self.principal.name;
    };
    
    self.getUserRole = function() {
        var roles = ['admin', 'franchazi', 'barista', 'client'];
        for (var j in roles)
            if (self.principal.hasRole(roles[j]))
                break;
        return roles[j];
    };
   
    function qFrancByUserNameOnRequeried(evt) {//GEN-FIRST:event_qFrancByUserNameOnRequeried
        if (self.principal.hasRole('barista')||self.principal.hasRole('franchazi')) {
            var franchazi = model.qFrancByUserName.franchazi_id;
            if (franchazi) {
                if (model.qFrancByUserName.cursor.franc_users_active){
                    model.params.franchaziId = franchazi;
                } else {
                    model.params.franchaziId = null;
                   // alert(self.msg.MSG_ERROR_INACTIVE_USER);
                    ep.addEvent('userNotActive', {username : model.params.userName});
                    self.close();
                }
            } else {
                model.params.franchaziId = null;
                //alert(self.msg[MSG_ERROR_NO_FRANCHAZI_4USER]);
                ep.addEvent('userNotActive', {username : model.params.userName});
                self.close();
            }
        }
    }//GEN-LAST:event_qFrancByUserNameOnRequeried
}
