/**
 * 
 * @author Alexey
 * @name Calculations
 */

var flats = null;
var groups = null;
var formulEval = new FormulaEvaluator();
/**
 * 
 * @param {type} aGroupID
 * @param {type} aFlatID
 * @param {type} aDateID
 * @returns {Boolean}
 */
function prepareCalcModule(aGroupID, aFlatID, aDateID){
    try {
        dsCalcObject.params.groupid = aGroupID;
        dsCalcObject.params.lc_id = aFlatID;
        dsCalcObject.execute();
        groups = new Groups(aDateID);
        flats = new Flats(aDateID);

        dsSums4calc.params.lc_id = aFlatID;
        dsSums4calc.params.groupid = aGroupID;
        dsSums4calc.params.date_id = aDateID;
        dsSums4calc.execute();
        
        return true;
    } catch (e){
        return false;
    }
};

/**
 * 
 * @param {type} aDateID
 * @returns nothing
 * @Generates new object groupID.CharName = value;
 *                       groupID.ServiceName.CounterName = value;
 */
function Groups(aDateID){
    dsCalcObject.beforeFirst();
    while (dsCalcObject.next())
        if (!this[dsCalcObject.group_id])
            this[dsCalcObject.group_id] = new GroupConstructor(dsCalcObject.group_id, aDateID);

    function GroupConstructor(aGroupID, aDateID){
        var grpChars = getGroupChars(aGroupID);
        for (var chrName in grpChars)
            this[chrName] = grpChars[chrName];
        var grpServices = getGroupServicesAndCounters(aGroupID, aDateID);
        for (var grpServ in grpServices)
            this[grpServ] = grpServices[grpServ];
    }
    
    function getGroupChars(aGroupID){
        var resChars = {};
        dsGroupChars.params.groupid = aGroupID;
        dsGroupChars.execute();
        dsGroupChars.beforeFirst();
        while (dsGroupChars.next())
            resChars[dsGroupChars.fm_name] = dsGroupChars.fm_value;
        return resChars;
    }
    
    function getGroupServicesAndCounters(aGroupID, aDateID){
        var resCnt = {};
        
        dsGroupCntBeg.params.groupid = aGroupID;
        dsGroupCntBeg.params.dateid = aDateID;
        dsGroupCntBeg.execute();
        dsGroupCntBeg.beforeFirst();
        while (dsGroupCntBeg.next()){
            if (!resCnt[dsGroupCntBeg.services_id]) 
                        resCnt[dsGroupCntBeg.services_id] = {};
            resCnt[dsGroupCntBeg.services_id][dsGroupCntBeg.fm_name] = dsGroupCntBeg.fm_value;
        }

        dsGroupCntEnd.params.groupid = aGroupID;
        dsGroupCntEnd.params.dateid = aDateID;
        dsGroupCntEnd.execute();
        dsGroupCntEnd.beforeFirst();
        while (dsGroupCntEnd.next()){
            if (!resCnt[dsGroupCntEnd.services_id]) 
                        resCnt[dsGroupCntEnd.services_id] = {};
            resCnt[dsGroupCntEnd.services_id][dsGroupCntEnd.fm_name] = dsGroupCntEnd.fm_value;}
        
        return resCnt;
    }
};

/**
 * 
 * @param {type} aDateID
 * @returns {undefined}
 * @Generates new object LCID.CharName = value;
 *                       LCID.ServiceName.CounterName = value;
 */
function Flats(aDateID){
    //this.groups = [];
    dsCalcObject.beforeFirst();
    while (dsCalcObject.next())
        if (!this[dsCalcObject.lc_id])
            this[dsCalcObject.lc_id] = new FlatConstructor(lc_id, aDateID);

    function FlatConstructor(aLCID, aDateID){
        var fltChars = getLCChars(aLCID);
        for (var chrName in fltChars)
            this[chrName] = fltChars[chrName];
        var fltServices = getLCServicesAndCounters(aLCID, aDateID);
        for (var fltServ in fltServices)
            this[fltServ] = fltServices[fltServ];
    }
    
    function getLCChars(aLCID){
        var resChars = {};
        dsLCChars.params.lc_id = aLCID;
        dsLCChars.execute();
        dsLCChars.beforeFirst();
        while (dsLCChars.next())
            resChars[dsLCChars.fm_name] = dsLCChars.fm_value;
        return resChars;
    }
    
    function getLCServicesAndCounters(aLCID, aDateID){
        var resCnt = {};
        
        dsLCCntBeg.params.lc_id = aLCID;
        dsLCCntBeg.params.dateid = aDateID;
        dsLCCntBeg.execute();
        dsLCCntBeg.beforeFirst();
        while (dsLCCntBeg.next()){
            if (!resCnt[dsLCCntBeg.services_id]) 
                        resCnt[dsLCCntBeg.services_id] = {};
            resCnt[dsLCCntBeg.services_id][dsLCCntBeg.fm_name] = dsLCCntBeg.fm_value;
        }

        dsLCCntBeg.params.lc_id = aLCID;
        dsLCCntBeg.params.dateid = aDateID;
        dsLCCntBeg.execute();
        dsLCCntBeg.beforeFirst();
        while (dsLCCntBeg.next()){
            if (!resCnt[dsLCCntBeg.services_id]) 
                        resCnt[dsLCCntBeg.services_id] = {};
            resCnt[dsLCCntBeg.services_id][dsLCCntBeg.fm_name] = dsLCCntBeg.fm_value;}
        
        return resCnt;
    }  
};

function FormulaEvaluator(){
    var formulas = [];
    this.calculateFormula = function(aFormula){
        if (!formulas[aFormula])
            formulas[aFormula] = prepFormula(aFormula);
        return calcFormula(formulas[aFormula]);
    };

    function prepFormula(aFormula){

    }

    function calcFormula(evalFormula){

    }
}