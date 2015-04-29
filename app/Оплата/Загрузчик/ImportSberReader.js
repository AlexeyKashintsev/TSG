/**
 * 
 * @author Алексей
 * @module
 */ 
function ImportSberReader() {
    var self = this, model = this.model;
    var parcedData = [];
    var specification = {};
    
    self.extensions = ['txt'];

    
    var lineConfiguration = {
        LC_CODE: {
            cell: 2,
            type: 'string'
        },
        OPL_SUM: {
            cell: 3,
            type: 'number'
        },
        OPL_DATE: {
            cell: 8,
            type: 'date'
        },
        OPL_COMMENT: {
            cell: 10,
            type: 'text'
        },
        OPL_FULL_INFO: {
            cell: 7,
            type: 'text'
        }
    };
    
    var impSpecification = {
        RECORD_COUNT: 'Число записей',
        FULL_MONEY: 'Сумма реестра',
        BANK_PERCENT: 'Удержанная сумма',
        ACCOUNT_MONEY: 'Сумма к перечеслению',
        REG_NUMBER: 'Номер реестра/ID реестра ЕПС',
    };
    
    function getData(aData, aDataType) {
        var res = aData;
        switch (aDataType) {
            case 'number': {
                    res = parseFloat(aData);
                    break;
            }
            case 'date': {
                    var date = aData.split('/');
                    res = new Date(date[2], parseInt(date[1]) - 1,  parseInt(date[0]));
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
    
    self.importFromFile = function(aFilePath) {
        var fis = new java.io.FileInputStream(aFilePath);
        var scanner = new java.util.Scanner(fis);
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
