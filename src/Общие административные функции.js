/**
 * Platypus module script.
 * @name _32134448146809
 * Script may be used as library, form or report module, server module and etc.
 */

function _32134448146809() {


var self = this;


/**
 * Общие административные функции.js
 *
 * Created on 14.09.2011, 15:33:24
 */

/**
 *
 * @author mg
 */

/**
 * Возвращает сотрудника, к которому прикреплен пользователь, от имени которого прооисходит работа приложения.
 */

function loggedInEmployee()
{
    self.parUserName = self.model.client.loginPrincipal.name;
    if(!self.dsEployees.isEmpty())
        return self.dsEployees.TR_STAFF_ID;
    else
    {
        Logger.severe("No employee for logged in user: "+self.parUserName);
        return null;
    }
}

/**
 * Возвращает подразделение(контрагента), к которому принадлежит сотрудник, к которому прикреплен пользователь,
 * от имени которого прооисходит работа приложения.
 */
function loggedInAgent()
{
    self.parUserName = self.model.client.loginPrincipal.name;
    if(!self.dsEployees.isEmpty())
        return self.dsEployees.AGENT;
    else
    {
        Logger.severe("No employee for logged in user: "+self.parUserName);
        return null;
    }
}

function canSwapFrames(formId){
    var date = new Date();
    if (date > Date.parse("30 Dec 2012 10:12")){
        return true;
    }
    return false;
}


}