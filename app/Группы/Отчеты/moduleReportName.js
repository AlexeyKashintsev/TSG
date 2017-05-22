/**
 * Datasource module is stateless data fetch/apply provider.
 * @name moduleReportName
 * @author TSG
 * @module 
 */
function moduleReportName() {
    var self = this, model = this.model;
    
    this.schema = [
        {name: "report_name_view", type: String},
        {name: "report_name", type: String, ref: {property: "dsAllAccounts.report_name", entity: "dsAllAccounts"}}
        // TODO : place schema definition here, such as:
        /*
         {name: "property1Name", entity: "optionalEntityName", description: "Some property1 description", type: String, key: true},
         {name: "property2Name", entity: "optionalEntityName", description: "Some property2 description", type: String, ref: {property: "referencedPropertyName", entity: "referencedEntityName"}},
         {name: "property3Name", entity: "optionalEntityName", description: "Some property3 description", type: Number, required: true},
         */
    ];
    
    /**
     * Method invoked by platypus runtime in data fetching purposes.
     * @param aParams Object, with properties as defined in this module's model's parameters.
     * Properties values are setted by platypus runtime engine.
     */
    this.fetch = function(aParams) {
        return [
            {report_name_view: "Доверие Общий", report_name: "BillsBuilder_Doverie"},
            {report_name_view: "Интерстрой Общий", report_name: "BillsBuilder_Interstroy"},
            {report_name_view: "Интерстрой Сакко", report_name: "BillsBuilder_Interstroy_Sakko"},
            {report_name_view: "Доверие Капремонт", report_name: "BillsBuilder_Doverie_kapRemont"},
            {report_name_view: "Наш Дом Капремонт", report_name: "BillsBuilder_NashDom_kapRemont"},
            {report_name_view: "Наш Дом Общий", report_name: "BillsBuilder_Nash_Dom"},
        ];
        // TODO : place data achivement code. Fetching from mongodb for example
        /*
         return [
         {property1Name: "object 1 name", property2Name: "object 1 description", property3Name: 2},
         {property1Name: "object 2 name", property2Name: "object 2 description", property3Name: 20},
         {property1Name: "object 3 name", property2Name: "object 3 description", property3Name: 12},
         {property1Name: "object 4 name", property2Name: "object 4 description", property3Name: 85},
         {property1Name: "object 5 name", property2Name: "object 5 description", property3Name: 20},
         ];
         */
    };
    
    /**
     * Method invoked by platypus runtime in data applying purposes.
     * @param aLog Array of changes - log of changes made by clients or server side data driven code to be applied.
     */
    this.apply = function(aLog) {
        Logger.info("moduleReportName. aLog.length: " + aLog.length + ";");
        aLog.forEach(function(aChange) {
            aChange.consume();
        });
    };
    
}
