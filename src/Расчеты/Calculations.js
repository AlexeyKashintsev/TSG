/**
 * 
 * @author Alexey
 * @name Calculations
 */

var flats = null;
var groups = null;
var sums = new Sums();
var formulEval = new FormulaEvaluator();
var prepared = false;
/**
 * 
 * @param {type} aGroupID
 * @param {type} aFlatID
 * @param {type} aDateID
 * @returns {Boolean}
 */
this.prepareCalcModule = function(aGroupID, aFlatID, aDateID){
    prepared = false;
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
        
        prepared = true;
        return true;
    } catch (e){
        return false;
    }
};

this.calculateValues = function(){
    try {
        if (prepared){
            dsSums4calc.beforeFirst();
            while (dsSums4calc.next()){
                try {
                    dsSums4calc.calc_value = formulEval.calculate(dsSums4calc.calc_value_formula,
                                                                  sums.GetSum(dsSums4calc.per_sums_id),
                                                                  'VALUE');
                } catch (e) {
                    Logger.warning('Ошибка расчета объема по услуге 888 в квартире 888');
                }
                try {
                    dsSums4calc.calc = formulEval.calculate(dsSums4calc.calc_formula,
                                                            sums.GetSum(dsSums4calc.per_sums_id),
                                                            'CALC');
                } catch (e) {
                    Logger.warning('Ошибка расчета начисления по услуге 888 в квартире 888');
                }
                try {
                    dsSums4calc.benefit = formulEval.calculate('0',
                                                            sums.GetSum(dsSums4calc.per_sums_id),
                                                            'BENEFIT');
                } catch (e) {
                    Logger.warning('Ошибка расчета льготы по услуге 888 в квартире 888');
                }
                try {
                    dsSums4calc.recalc = formulEval.calculate('0',
                                                            sums.GetSum(dsSums4calc.per_sums_id),
                                                            'RECALC');
                } catch (e) {
                    Logger.warning('Ошибка расчета суммы перерасчета по услуге 888 в квартире 888');
                }
                try {
                    dsSums4calc.full_calc = formulEval.calculate('CALC-BENEFIT+RECALC',
                                                            sums.GetSum(dsSums4calc.per_sums_id),
                                                            'FULL_CALC');
                } catch (e) {
                    Logger.warning('Ошибка расчета полного значения по услуге 888 в квартире 888');
                }
                
            }                                              
            model.save();
            return true;
        } else return false;
    } catch (e) {return false;}
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
            this[dsCalcObject.lc_id] = new FlatConstructor(dsCalcObject.lc_id, aDateID);

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

        dsLCCntEnd.params.lc_id = aLCID;
        dsLCCntEnd.params.dateid = aDateID;
        dsLCCntEnd.execute();
        dsLCCntEnd.beforeFirst();
        while (dsLCCntEnd.next()){
            if (!resCnt[dsLCCntEnd.services_id]) 
                        resCnt[dsLCCntEnd.services_id] = {};
            resCnt[dsLCCntEnd.services_id][dsLCCntEnd.fm_name] = dsLCCntEnd.fm_value;}
        return resCnt;
    }  
};

function Sums(){
    this.sums = {};
    this.GetSum = function(aSumID){
        if (!sums[aSumID]) sums[aSumID] = new Sum(aSumID);
        return sums[aSumID];
    };
    
    function Sum(aSumID){
        var sum = dsSums4calc.findById(aSumID);
        this.sumid = aSumID;
        this.groupid = sum.group_id;
        this.lcid = sum.lc_id;
        this.serviceid = sum.services_id;
        this.COST = sum.rate;
    }
}
/**
 * GRP_ - параметр группы = groups[GRPID].
 * LC_ - параметр лицевого счета = flats[LCID].
 * .BEG_ - начальное показание счетчика = [SERVICEID].BEG_
 * .END_ - конечное показание счетчика = [SERVICEID].END_
 * CNAME - наименование характеристики = CNAME
 //* VALUE, COST, CALC, RECALC, BENEFIT, FULL_CALC
 * Подстановка: 
 * flats[lcid].CNAME, flats[lcid][SERVICEID].CNAME
 * groups[groupid].CNAME, groups[groupid][SERVICEID].CNAME
 * @returns {FormulaEvaluator}
 */
function FormulaEvaluator(){
    var formulas = [];
    this.calculate = function(aFormula, aSum, aParam){
        if (!formulas[aFormula])
            formulas[aFormula] = prepFormula(aFormula);
        aSum[aParam] = calcFormula(formulas[aFormula], aSum);
        return aSum[aParam];
    };

    function prepFormula(aFormula){
        aFormula = aFormula.replace(/GRP_/g, 'groups[A.groupid].').replace(/LC_/g, 'flats[A.lcid].');
        aFormula = aFormula.replace(/.BEG_/g, '[A.serviceid].BEG_').replace(/.END_/g, '[A.serviceid].END_');
        aFormula = aFormula.replace(/VALUE/g, 'A.VALUE').replace(/COST/g, 'A.COST').replace(/RECALC/g, 'A.RECALC');
        aFormula = aFormula.replace(/BENEFIT/g, 'A.BENEFIT').replace(/FULL_CALC/g, 'A.FULL_CALC').replace(/CALC/g,'A.CALC');
        return aFormula;
    }

    function calcFormula(evalFormula, A){
        return eval(evalFormula);
    }
}