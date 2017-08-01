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
            serverProgress.setFinished(false);
            serverProgress.setValue(0);
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
            prepared = true;
            return true;
        } catch (e) {
            Logger.warning(e);
            return false;
        }
    };

    self.calculateValues = function(aGroupID, aFlatID, aDateID) {
        function applyValues(cursor, values) {
            for (var j in values)
                cursor[j] = values[j];
        }
        
        function saveData() {
            serverProgress.setDescription("Сохранение значений расчета начислений");
            model.save();
            saldoClc.calculateFlatSaldo(aGroupID, aFlatID, aDateID);
        }
        (function() {
            proceedData(aGroupID, aFlatID, aDateID, applyValues, saveData);
        }).invokeBackground();
    };
    
    var errors = [];
    self.getErrors = function() {
        return errors;
    };
    
    self.doAudit = function(aGroupID, aFlatID, aDateID) {
        function doCheckValues(cursor, values) {
            for (var j in values)
                try {
                    if ((cursor[j]).toFixed(2) != (values[j]).toFixed(2)) {
                        var er = {
                            er_type: "Расчитанное и сохраненное значения не совпадают",
                            lc_id: cursor.lc_id,
                            service_id: cursor.services_id,
                            date_id: cursor.date_id,
                            value_name: j,
                            saved_value: cursor[j],
                            calculated_value: values[j]
                        };
                        Logger.warning(er.er_type + ': ' + er.saved_value + ' != ' + er.calculated_value);
                        errors.push(er);
                    }
                } catch (e) {
                        if (!cursor[j] && values[j] || cursor[j]) {
                            var er = {
                                er_type: "Ошибка при сравнении: " + e,
                                lc_id: cursor.lc_id,
                                service_id: cursor.services_id,
                                date_id: cursor.date_id,
                                value_name: j,
                                saved_value: cursor[j],
                                calculated_value: values[j]
                            };
                            Logger.warning(er.er_type + ': ' + er.saved_value + ' != ' + er.calculated_value);
                            errors.push(er);
                        }
                }
        }
        
        function endProcess() {
            saldoClc.doAudit(aGroupID, aFlatID, aDateID);
            if (saldoClc.getErrors())
                errors.push(saldoClc.getErrors());
            serverProgress.finish();
        }
        
        errors = [];
        
        (function() {
            proceedData(aGroupID, aFlatID, aDateID, doCheckValues, endProcess);
        }).invokeBackground();
    };
    
    function proceedData(aGroupID, aFlatID, aDateID, aProceedFunction, aFinishCallback) {
 
        serverProgress.setDescription("Подготовка");
        prepareCalcModule(aGroupID, aFlatID, aDateID);

        serverProgress.setDescription("Расчет начислений");
        try {
            if (prepared) {
                model.dsSums4calc.forEach(function(cursor) {
                    aProceedFunction(cursor, getValues(cursor));
                    serverProgress.increaseValue(1);
                });
                aFinishCallback();
            } else {
                serverProgress.finish();
                return false;
            }
        } catch (e) {
            Logger.warning(e);
            serverProgress.finish();
            return false;
        }
    }
    
    function getValues(data) {
            //Logger.info("Расчет начисления: " + cursor.per_sums_id);
        var res = {};
        try {
            if (data.calc_value_formula)
                res.calc_value = formulEval.calculate(data.calc_value_formula,
                        sums.GetSum(data.per_sums_id),
                        'VALUE');
        } catch (e) {
            Logger.warning('Ошибка расчета объема PerSumsID: ' + data.per_sums_id);
        }
        try {
            res.calc = formulEval.calculate(data.calc_formula,
                    sums.GetSum(data.per_sums_id),
                    'SCALC');
        } catch (e) {
            Logger.warning('Ошибка расчета начисления по услуге ' + data.services_id + ' в квартире  ' + aFlatID);
        }
        try {
            res.benefit = formulEval.calculate('0',
                    sums.GetSum(data.per_sums_id),
                    'BENEFIT');
        } catch (e) {
            Logger.warning('Ошибка расчета льготы по услуге ' +data.services_id + ' в квартире ' + aFlatID);
        }
        try {
            res.recalc = formulEval.calculate(data.recalc ? 'RECALC' : '0',
                    sums.GetSum(data.per_sums_id),
                    'RECALC');
        } catch (e) {
            Logger.warning('Ошибка расчета суммы перерасчета по услуге ' +data.services_id + ' в квартире  ' + aFlatID);
        }
        ;
        try {
            res.full_calc = formulEval.calculate('SCALC-BENEFIT-RECALC',
                    sums.GetSum(data.per_sums_id),
                    'FULL_CALC');
        } catch (e) {
            Logger.warning('Ошибка расчета полного значения по услуге ' +data.services_id + ' в квартире  ' + aFlatID);
        }

        return res;
    }
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
    };

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
            this.DEF_NRM = sum.def_norm;
            this.NRM = sum.norm;
            this.RECALC = sum.recalc;
            this.BY_NRM = sum.calc_by_norm;
            this.REG_CNT = sum.registered_count;
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
            var calc = calcFormula(formulas[aFormula], aSum);
            aSum[aParam] = calc ? calc : 0;
            return aSum[aParam];
        };

        function prepFormula(aFormula) {
            aFormula = aFormula.replace(/BENEFIT/g, 'A.BENEFIT').replace(/FULL_CALC/g, 'A.FULL_CALC').replace(/SCALC/g, 'A.SCALC');
            aFormula = aFormula.replace(/CALC_BY_NORM/g, 'A.BY_NRM').replace(/DEF_NORM/g, 'A.DEF_NRM').replace(/NORM/g, 'A.NRM').replace(/REG_CNT/g, 'A.REG_CNT');
            aFormula = aFormula.replace(/GRP_/g, 'groups[A.groupid].').replace(/LC_/g, 'flats[A.lcid].');
            aFormula = aFormula.replace(/.BEG_/g, '[A.flatserviceid].BEG_').replace(/.END_/g, '[A.flatserviceid].END_');
            aFormula = aFormula.replace(/VALUE/g, 'A.VALUE').replace(/COST/g, 'A.COST').replace(/RECALC/g, 'A.RECALC');
            return aFormula;
        }

        function calcFormula(evalFormula, A) {
            return eval(evalFormula);
        }
    };
}