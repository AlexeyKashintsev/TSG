/**
 * 
 * @name ImportSberReader
 * @author Алексей
 * @module
 */
function ImportDoverieReader() {
    var self = this, model = this.model;
    var parcedData = [];
    var specification = {};
    var MAX_ERRORS_PER_LIST = 0;
    var wb = null;
    var evaluator = null;
    var errCount = 0;

    self.extensions = ['xls', 'xlsx'];

    function addErrorLog(aLog) {
        Logger.warning(aLog);
    }

    function addLog(aLog) {
        Logger.info(aLog);
    }

    var lineConfiguration = {
        LC_CODE: {
            cell: 3,
            type: 'string'
        },
        OPL_SUM: {
            cell: 5,
            type: 'number'
        },
        OPL_DATE: {
            cell: 1,
            type: 'date'
        },
        CUR_HW: {
            cell: 6,
            type: 'number'
        },
        CUR_CW: {
            cell: 7,
            type: 'number'
        }
    };

    var impSpecification = {
        RECORD_COUNT: 'Число записей',
        FULL_MONEY: 'Сумма реестра',
        BANK_PERCENT: 'Удержанная сумма',
        ACCOUNT_MONEY: 'Сумма к перечеслению',
        REG_NUMBER: 'Номер реестра/ID реестра ЕПС'
    };

    function getData(aData, aDataType) {
        var res = aData;
        switch (aDataType) {
            case 'number':
                {
                    res = parseFloat(aData);
                    break;
                }
            case 'date':
                {
                    var date = aData.split('/');
                    res = new Date(+date[2], +date[1] - 1, +date[0]);
                    break;
                }
        }
        return res;
    }

    function postProcess(anArray) {
        if (!anArray.LC_CODE) {
            var str = anArray.OPL_FULL_INFO;
            var specAr = str.split(':');
            anArray.LC_CODE = specAr[3];
        }
        return anArray;

    }

    function processString(aString) {
        if (aString[0] === '#') {
            var str = aString.substring(2);
            var specAr = str.split(';');
            for (var j in specAr)
                specAr[j] = specAr[j].trim();
            for (var j in impSpecification) {
                if (specAr[1] === impSpecification[j]) {
                    specification[j] = parseInt(specAr[0]);
                }
            }
        } else {
            var dataAr = aString.split(';');
            if (dataAr.length > 10) {
                var recAr = {};
                for (var j in lineConfiguration)
                    recAr[j] = getData(dataAr[lineConfiguration[j].cell], lineConfiguration[j].type);
                recAr = postProcess(recAr);
                parcedData.push(recAr);
            }
        }
    }

//    .importFromFile = function(aFilePath) {
//        var fis = new java.io.FileInputStream(aFilePath);
//        var scanner = new java.util.Scanner(fis,  "windows-1251");
//        var string = null;
//        specification = {};
//        
//        if (parcedData !== [])
//            parcedData = [];
//        while (scanner.hasNext()) {
//            string = scanner.nextLine();
//            if (string.length > 1)
//                processString(string);
//        }
//        
//        return parcedData;
//    };

    self.importFromFile = function(aFilePath) {
        try {
            errCount = 0;
            var fis = new java.io.FileInputStream(aFilePath);
            wb = new org.apache.poi.hssf.usermodel.HSSFWorkbook(fis);
            evaluator = wb.getCreationHelper().createFormulaEvaluator();
            var startSheet = 0;
            for (var k = startSheet; k < wb.getNumberOfSheets(); k++) {
                processSheet(wb.getSheetAt(k), k);
            }
        }
        catch (e) {
            addErrorLog("Ошибка импорта из файла: " + e);
        }
        finally {
            fis.close();
            if (errCount < MAX_ERRORS_PER_LIST) {
                addLog("\nИмпорт из файла: " + aFilePath + " завершен.\n")
            } else {
                addErrorLog("\nОшибка импорта из файла: " + aFilePath + ". Проверьте сопоставление полей\nДанные не будут сохранены!\n");
            }
        }
        return parcedData;
    };

    function processSheet(aSheet, aSheetNum, aGroup) {
        var rows = aSheet.getPhysicalNumberOfRows();
        for (var rowNum = 0; rowNum < rows; rowNum++) {
            readSheetRow(aSheet, rowNum, aSheetNum);
        }
    }

    function getDateValue(aCellData) {
        var res = null;
        if (aCellData) {
//            if (aCellData > 3000)
                res = aCellData.getDateCellValue();
//            else
//                res = !aCellData ? null : new Date(aCellData, 0, 1, 3);
        }
        return res;
    }

    function readSheetRow(aSheet, aRowNum) {
        try {
            var curRow = aSheet.getRow(aRowNum);
            var recAr = {};

            for (var j in lineConfiguration) {
                var cell = curRow.getCell([lineConfiguration[j].cell])
                recAr[j] = lineConfiguration[j].type === 'date' ? getDateValue(cell) : cell;
            }
            recAr = postProcess(recAr);
            parcedData.push(recAr);
        }
        catch (e) {
            addErrorLog('\nСтрока ' + aRowNum + '. Критическая ошибка чтения 448.\n' + e)
            recAr = new function() {
                this.isOk = false;
            };
        }
    }



    self.getSpecification = function() {
        return specification;
    };
}
