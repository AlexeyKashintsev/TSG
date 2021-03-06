/**
 * 
 * @author Alexey
 * @name Calculations
 * @public
 */

function Calculations() {


    var self = this, model = self.model;


    var flats = null;
    var groups = null;
    var sums = new Sums();
    var formulEval = new FormulaEvaluator();
    var prepared = false;
    var saldoClc = new CalculateFlatSaldo();
    //var progress = new serverProgress();
    /**
     * 
     * @param {type} aGroupID
     * @param {type} aFlatID
     * @param {type} aDateID
     * @returns {Boolean}
     */
    function prepareCalcModule(aGroupID, aFlatID, aDateID) {
        prepared = false;
        try {
            sums = new Sums();
            model.params.parDateID = aDateID;
            model.params.parFlatID = aFlatID;
            model.params.parGroupID = aGroupID;
            model.updateNullCounterValues.params.dateID = aDateID;
            model.updateNullCounterValues.executeUpdate();
            self.dsCalcObject.requery();
            groups = new Groups(aDateID);
            flats = new Flats(aDateID);
            model.dsSums4calc.requery();
            serverProgress.setMax(self.dsSums4calc.length);
            serverProgress.setValue(0);
            prepared = true;
            return true;
        } catch (e) {
            Logger.warning(e);
            return false;
        }
    };

    self.calculateValues = function(aGroupID, aFlatID, aDateID) {
        (function() {
            serverProgress.setDescription("Подготовка");
            prepareCalcModule(aGroupID, aFlatID, aDateID);
            serverProgress.setDescription("Расчет начислений");
            try {
                if (prepared) {
                    self.dsSums4calc.beforeFirst();
                    model.dsSums4calc.forEach(function(cursor) {
                        //Logger.info("Расчет начисления: " + cursor.per_sums_id);
                        try {
                            if (cursor.calc_value_formula)
                                cursor.calc_value = formulEval.calculate(cursor.calc_value_formula,
                                        sums.GetSum(cursor.per_sums_id),
                                        'VALUE');
                        } catch (e) {
                            Logger.warning('Ошибка расчета объема PerSumsID: ' + cursor.per_sums_id);
                        }
                        try {
                            cursor.calc = formulEval.calculate(cursor.calc_formula,
                                    sums.GetSum(cursor.per_sums_id),
                                    'SCALC');
                        } catch (e) {
                            Logger.warning('Ошибка расчета начисления по услуге ' +cursor.services_id + ' в квартире  ' + aFlatID);
                        }
                        try {
                            cursor.benefit = formulEval.calculate('0',
                                    sums.GetSum(cursor.per_sums_id),
                                    'BENEFIT');
                        } catch (e) {
                            Logger.warning('Ошибка расчета льготы по услуге ' +cursor.services_id + ' в квартире ' + aFlatID);
                        }
                        try {
                            cursor.recalc = formulEval.calculate(cursor.recalc ? 'RECALC' : '0',
                                    sums.GetSum(cursor.per_sums_id),
                                    'RECALC');
                        } catch (e) {
                            Logger.warning('Ошибка расчета суммы перерасчета по услуге ' +cursor.services_id + ' в квартире  ' + aFlatID);
                        }
                        ;
                        try {
                            cursor.full_calc = formulEval.calculate('SCALC-BENEFIT-RECALC',
                                    sums.GetSum(cursor.per_sums_id),
                                    'FULL_CALC');
                        } catch (e) {
                            Logger.warning('Ошибка расчета полного значения по услуге ' +cursor.services_id + ' в квартире  ' + aFlatID);
                        }
                            serverProgress.increaseValue(1);
                    });
                    serverProgress.setDescription("Сохранение значений расчета начислений");
                    model.save();
                    saldoClc.calculateFlatSaldo(aGroupID, aFlatID, aDateID);
                    return true;
                } else {
                    serverProgress.finish();

                    return false;
                }
            } catch (e) {
                Logger.warning(e);
                return false;
            }
        }).invokeBackground();
    };

    /**
     * 
     * @param {type} aDateID
     * @returns nothing
     * @Generates new object groupID.CharName = value;
     *                       groupID.ServiceName.CounterName = value;
     */
    function Groups(aDateID) {
        model.dsCalcObject.forEach(function(cursor) {
            if (!this[cursor.group_id])
                this[cursor.group_id] = new GroupConstructor(cursor.group_id, aDateID);
        }, this);
        
        function GroupConstructor(aGroupID, aDateID) {
            var grpChars = getGroupChars(aGroupID);
            for (var chrName in grpChars)
                this[chrName] = grpChars[chrName];
            var grpServices = getGroupServicesAndCounters(aGroupID, aDateID);
            for (var grpServ in grpServices)
                this[grpServ] = grpServices[grpServ];
        }

        function getGroupChars(aGroupID) {
            var resChars = {};
            model.dsGroupChars.params.groupid = aGroupID;
            model.dsGroupChars.execute();
            model.dsGroupChars.forEach(function(cursor) {
                resChars[cursor.fm_name] = cursor.fm_value;
            });
            return resChars;
        };

        function getGroupServicesAndCounters(aGroupID, aDateID) {
            var resCnt = {};

            model.dsGroupCntBeg.params.groupid = aGroupID;
            model.dsGroupCntBeg.params.dateid = aDateID;
            model.dsGroupCntBeg.execute();
            model.dsGroupCntBeg.forEach(function(cursor) {
                if (!resCnt[cursor.services_id])
                    resCnt[cursor.services_id] = {};
                resCnt[cursor.services_id][cursor.fm_name] = cursor.fm_value;
            });

            model.dsGroupCntEnd.params.groupid = aGroupID;
            model.dsGroupCntEnd.params.dateid = aDateID;            
            model.dsGroupCntEnd.execute();            
            model.dsGroupCntEnd.forEach(function(cursor) {
                if (!resCnt[cursor.services_id])
                    resCnt[cursor.services_id] = {};
                resCnt[cursor.services_id][cursor.fm_name] = cursor.fm_value;
            });

            return resCnt;
        }
    }
    ;

    /**
     * 
     * @param {type} aDateID
     * @returns {undefined}
     * @Generates new object LCID.CharName = value;
     *                       LCID.ServiceName.CounterName = value;
     */
    function Flats(aDateID) {
        //this.groups = [];        
        model.dsCalcObject.forEach(function(cursor) {
            if (!this[cursor.lc_id])
                this[cursor.lc_id] = new FlatConstructor(cursor.lc_id, aDateID);
            }, this);
        function FlatConstructor(aLCID, aDateID) {
            var fltChars = getLCChars(aLCID);
            for (var chrName in fltChars)
                this[chrName] = fltChars[chrName];
            var fltServices = getLCServicesAndCounters(aLCID, aDateID);
            for (var fltServ in fltServices)
                this[fltServ] = fltServices[fltServ];
        }

        function getLCChars(aLCID) {
            var resChars = {};
            model.dsLCChars.params.lc_id = aLCID;
            model.dsLCChars.execute();
            model.dsLCChars.forEach(function(cursor) {
                resChars[cursor.fm_name] = cursor.fm_value;
            });
            return resChars;
        }

        function getLCServicesAndCounters(aLCID, aDateID) {
            var resCnt = {};

            model.dsLCCntBeg.params.lc_id = aLCID;
            model.dsLCCntBeg.params.dateid = aDateID;            
            model.dsLCCntBeg.execute();
            model.dsLCCntBeg.forEach(function(cursor) {
                if (!resCnt[cursor.lc_flat_services_id])
                    resCnt[cursor.lc_flat_services_id] = {};
                resCnt[cursor.lc_flat_services_id][cursor.fm_name] = cursor.fm_value;
            });

            model.dsLCCntEnd.params.lc_id = aLCID;
            model.dsLCCntEnd.params.dateid = aDateID;            
            model.dsLCCntEnd.execute();
            model.dsLCCntEnd.forEach(function(cursor) {
                if (!resCnt[cursor.lc_flat_services_id])
                    resCnt[cursor.lc_flat_services_id] = {};
                resCnt[cursor.lc_flat_services_id][cursor.fm_name] = cursor.fm_value;
            });
            return resCnt;
        }
    }
    ;

    function Sums() {
        this.sums = {};
        this.GetSum = function(aSumID) {
            if (!sums[aSumID])
                sums[aSumID] = new Sum(aSumID);
            return sums[aSumID];
        };

        function Sum(aSumID) {
            var sum = self.dsSums4calc.findById(aSumID);
            this.sumid = aSumID;
            this.groupid = sum.group_id;
            this.lcid = sum.lc_id;
            this.serviceid = sum.services_id;
            this.flatserviceid = sum.flat_service_id;
            this.COST = sum.rate;
            this.RECALC = sum.recalc;
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
    function FormulaEvaluator() {
        var formulas = [];
        this.calculate = function(aFormula, aSum, aParam) {
            if (!formulas[aFormula])
                formulas[aFormula] = prepFormula(aFormula);
            aSum[aParam] = calcFormula(formulas[aFormula], aSum);
            return aSum[aParam];
        };

        function prepFormula(aFormula) {
            aFormula = aFormula.replace(/GRP_/g, 'groups[A.groupid].').replace(/LC_/g, 'flats[A.lcid].');
            aFormula = aFormula.replace(/.BEG_/g, '[A.flatserviceid].BEG_').replace(/.END_/g, '[A.flatserviceid].END_');
            aFormula = aFormula.replace(/VALUE/g, 'A.VALUE').replace(/COST/g, 'A.COST').replace(/RECALC/g, 'A.RECALC');
            aFormula = aFormula.replace(/BENEFIT/g, 'A.BENEFIT').replace(/FULL_CALC/g, 'A.FULL_CALC').replace(/SCALC/g, 'A.SCALC');
            return aFormula;
        }

        function calcFormula(evalFormula, A) {
            return eval(evalFormula);
        }
    }
    ;
}