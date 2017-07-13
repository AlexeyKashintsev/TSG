/**
 * 
 * @name ImportSberReader
 * @author Алексей
 * @module
 */ 
function ImportSberInterStroyReader() {
        var self = this, model = this.model;
    var parcedData = [];
    var specification = {};
    
    self.extensions = ['txt', 'csv'];

    
    var lineConfiguration = {
        LC_CODE: {
            cell: 5,
            type: 'string',
            remFirst: 1
        },
        OPL_SUM: {
            cell: 9,
            type: 'number'
        },
        OPL_DATE: {
            cell: 0,
            type: 'date'
        },
        OPL_COMMENT: {
            cell: 4,
            type: 'text'
        },
        OPL_FULL_INFO: {
            cell: 4,
            type: 'text'
        },
        OPL_FIO: {
            cell: 6,
            type: 'text'
        },
        OPL_ADDRESS: {
            cell: 5,
            type: 'text'
        }
    };
    
    var impSpecification = {
        RECORD_COUNT: 'Число записей',
        FULL_MONEY: 'Сумма реестра',
        BANK_PERCENT: 'Удержанная сумма',
        ACCOUNT_MONEY: 'Сумма к перечеслению',
        REG_NUMBER: 'Номер реестра/ID реестра ЕПС'
    };
    
    function getData(aData, aDataType, config) {
        var res = aData;
        switch (aDataType) {
            case 'number': {
                    res = parseFloat(aData);
                    break;
            }
            case 'date': {
                    var date = aData.split('-');
                    res = new Date(+date[2], +date[1] - 1,  +date[0]);
                    break;
            }
        }
        if (config.remFirst) {
            res = res.substring(config.remFirst);
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
        if (aString[0] === '=') {
            var str = aString.substring(1);
            var specAr = str.split(';');
             specification = {
                RECORD_COUNT: specAr[0],
                FULL_MONEY: specAr[1],
                BANK_PERCENT: specAr[3],
                ACCOUNT_MONEY: specAr[2],
                REG_NUMBER: specAr[4]
            };
        } else {
            var dataAr = aString.split(';');
            if (dataAr.length > 10) {
                var recAr = {};
                for (var j in lineConfiguration) {
                    recAr[j] = getData(dataAr[lineConfiguration[j].cell], lineConfiguration[j].type, lineConfiguration[j]);
                }
                recAr = postProcess(recAr);
                parcedData.push(recAr);
            }
        }
    }
    
    self.importFromFile = function(aFilePath) {
        var fis = new java.io.FileInputStream(aFilePath);
        var scanner = new java.util.Scanner(fis,  "windows-1251");
        var string = null;
        specification = {};
        
        if (parcedData !== [])
            parcedData = [];
        while (scanner.hasNext()) {
            string = scanner.nextLine();
            if (string.length > 1)
                processString(string);
        }
        
        return parcedData;
    };
    
    self.getSpecification = function() {
        return specification;
    };
    
}
