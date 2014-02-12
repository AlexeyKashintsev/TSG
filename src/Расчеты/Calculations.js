/**
 * 
 * @author Alexey
 * @name Calculations
 */

function Calculations() {


var self = this;


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
function prepareCalcModule(aGroupID, aFlatID, aDateID){
    prepared = false;
    try {
        sums = new Sums();
        self.parDateID = aDateID;
        self.parFlatID = aFlatID;
        self.parGroupID = aGroupID;
        self.dsCalcObject.requery();
        groups = new Groups(aDateID);
        flats = new Flats(aDateID);
        self.dsSums4calc.requery();
        
        prepared = true;
        return true;
    } catch (e){
        Logger.warning(e);
        return false;
    }
};

self.calculateValues = function(aGroupID, aFlatID, aDateID){
    prepareCalcModule(aGroupID, aFlatID, aDateID);
    try {
        if (prepared){
            self.dsSums4calc.beforeFirst();
            while (self.dsSums4calc.next()){
                try {
                    if (self.dsSums4calc.calc_value_formula)
                        self.dsSums4calc.calc_value = formulEval.calculate(self.dsSums4calc.calc_value_formula,
                                                                      sums.GetSum(self.dsSums4calc.per_sums_id),
                                                                      'VALUE');
                } catch (e) {
                    Logger.warning('Ошибка расчета объема PerSumsID: '+ self.dsSums4calc.per_sums_id);
                }
                try {
                    self.dsSums4calc.calc = formulEval.calculate(self.dsSums4calc.calc_formula,
                                                            sums.GetSum(self.dsSums4calc.per_sums_id),
                                                            'SCALC');
                } catch (e) {
                    Logger.warning('Ошибка расчета начисления по услуге 888 в квартире 888');
                }
                try {
                    self.dsSums4calc.benefit = formulEval.calculate('0',
                                                            sums.GetSum(self.dsSums4calc.per_sums_id),
                                                            'BENEFIT');
                } catch (e) {
                    Logger.warning('Ошибка расчета льготы по услуге 888 в квартире 888');
                }
                try {
                    self.dsSums4calc.recalc = formulEval.calculate('0',
                                                            sums.GetSum(self.dsSums4calc.per_sums_id),
                                                            'RECALC');
                } catch (e) {
                    Logger.warning('Ошибка расчета суммы перерасчета по услуге 888 в квартире 888');
                }
                try {
                    self.dsSums4calc.full_calc = formulEval.calculate('SCALC-BENEFIT+RECALC',
                                                            sums.GetSum(self.dsSums4calc.per_sums_id),
                                                            'FULL_CALC');
                } catch (e) {
                    Logger.warning('Ошибка расчета полного значения по услуге 888 в квартире 888');
                }
                
            }                                              
            self.model.save();
            //self.dsCalcObject.beforeFirst();
           // while (self.dsCalcObject.next()) 
                calculateFlatSaldo();//self.dsCalcObject.lc_id);
            return true;
        } else return false;
    } catch (e) {
        Logger.warning(e);
        return false;
    }
};

function calculateFlatSaldo(aFlatID){
    //self.prSaldo4calcFromSums.executeUpdate();
  //  self.dsSaldo4calc.params.flatid = aFlatID;
    
    self.dsSaldo4calc.requery();
    self.dsSumOfSums.requery();
    self.dsSumOfPayments.requery();
    self.dsSaldo4calc.beforeFirst();
    while (self.dsSaldo4calc.next()){
        var sc = self.dsSumOfSums.find(self.dsSumOfSums.md.lc_id, self.dsSaldo4calc.lc_id)[0];
        var sp = self.dsSumOfPayments.find(self.dsSumOfPayments.md.flat_id, self.dsSaldo4calc.lc_id);
        if (sp.length==1) sp = sp[0];
        else sp.pay_sum = 0;
        self.dsSaldo4calc.sal_calc = sc.sal_calc;
        self.dsSaldo4calc.sal_benefit = sc.sal_benefit;
        self.dsSaldo4calc.sal_recalc = sc.sal_recalc;
        self.dsSaldo4calc.sal_full_calc = sc.sal_full_calc;
        self.dsSaldo4calc.sal_payments = sp.pay_sum;
        self.dsSaldo4calc.sal_end = self.dsSaldo4calc.sal_begin + sc.sal_full_calc - sp.pay_sum;
    }
    self.model.save();
};

/**
 * 
 * @param {type} aDateID
 * @returns nothing
 * @Generates new object groupID.CharName = value;
 *                       groupID.ServiceName.CounterName = value;
 */
function Groups(aDateID){
    self.dsCalcObject.beforeFirst();
    while (self.dsCalcObject.next())
        if (!this[self.dsCalcObject.group_id])
            this[self.dsCalcObject.group_id] = new GroupConstructor(self.dsCalcObject.group_id, aDateID);

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
        self.dsGroupChars.params.groupid = aGroupID;
        self.dsGroupChars.execute();
        self.dsGroupChars.beforeFirst();
        while (self.dsGroupChars.next())
            resChars[self.dsGroupChars.fm_name] = self.dsGroupChars.fm_value;
        return resChars;
    }
    
    function getGroupServicesAndCounters(aGroupID, aDateID){
        var resCnt = {};
        
        self.dsGroupCntBeg.params.groupid = aGroupID;
        self.dsGroupCntBeg.params.dateid = aDateID;
        self.dsGroupCntBeg.execute();
        self.dsGroupCntBeg.beforeFirst();
        while (self.dsGroupCntBeg.next()){
            if (!resCnt[self.dsGroupCntBeg.services_id]) 
                        resCnt[self.dsGroupCntBeg.services_id] = {};
            resCnt[self.dsGroupCntBeg.services_id][self.dsGroupCntBeg.fm_name] = self.dsGroupCntBeg.fm_value;
        }

        self.dsGroupCntEnd.params.groupid = aGroupID;
        self.dsGroupCntEnd.params.dateid = aDateID;
        self.dsGroupCntEnd.execute();
        self.dsGroupCntEnd.beforeFirst();
        while (self.dsGroupCntEnd.next()){
            if (!resCnt[self.dsGroupCntEnd.services_id]) 
                        resCnt[self.dsGroupCntEnd.services_id] = {};
            resCnt[self.dsGroupCntEnd.services_id][self.dsGroupCntEnd.fm_name] = self.dsGroupCntEnd.fm_value;}
        
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
    self.dsCalcObject.beforeFirst();
    while (self.dsCalcObject.next())
        if (!this[self.dsCalcObject.lc_id])
            this[self.dsCalcObject.lc_id] = new FlatConstructor(self.dsCalcObject.lc_id, aDateID);

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
        self.dsLCChars.params.lc_id = aLCID;
        self.dsLCChars.execute();
        self.dsLCChars.beforeFirst();
        while (self.dsLCChars.next())
            resChars[self.dsLCChars.fm_name] = self.dsLCChars.fm_value;
        return resChars;
    }
    
    function getLCServicesAndCounters(aLCID, aDateID){
        var resCnt = {};
        
        self.dsLCCntBeg.params.lc_id = aLCID;
        self.dsLCCntBeg.params.dateid = aDateID;
        self.dsLCCntBeg.execute();
        self.dsLCCntBeg.beforeFirst();
        while (self.dsLCCntBeg.next()){
            if (!resCnt[self.dsLCCntBeg.services_id]) 
                        resCnt[self.dsLCCntBeg.services_id] = {};
            resCnt[self.dsLCCntBeg.services_id][self.dsLCCntBeg.fm_name] = self.dsLCCntBeg.fm_value;
        }

        self.dsLCCntEnd.params.lc_id = aLCID;
        self.dsLCCntEnd.params.dateid = aDateID;
        self.dsLCCntEnd.execute();
        self.dsLCCntEnd.beforeFirst();
        while (self.dsLCCntEnd.next()){
            if (!resCnt[self.dsLCCntEnd.services_id]) 
                        resCnt[self.dsLCCntEnd.services_id] = {};
            resCnt[self.dsLCCntEnd.services_id][self.dsLCCntEnd.fm_name] = self.dsLCCntEnd.fm_value;}
        return resCnt;
    }  
};

function Sums(){
    this.sums = {};
    this.GetSum = function(aSumID){
        if (!sums[aSumID]) sums[aSumID] = new Sum(aSumID);
        return sums[aSumID];
        //return new Sum(aSumID);
    };
    
    function Sum(aSumID){
        var sum = self.dsSums4calc.findById(aSumID);
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
 //* VALUE, COST, SCALC, RECALC, BENEFIT, FULL_CALC
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
        aFormula = aFormula.replace(/BENEFIT/g, 'A.BENEFIT').replace(/FULL_CALC/g, 'A.FULL_CALC').replace(/SCALC/g,'A.SCALC');
        return aFormula;
    }

    function calcFormula(evalFormula, A){
        return eval(evalFormula);
    }
};
}