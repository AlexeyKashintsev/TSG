/**
 * 
 * @author Алексей
 * @name Импорт
 */
var MAX_ERRORS_PER_LIST = 3;

var logOutTextField = null, progressInd = null, filesCounter = null, FileNameOut = null;
    
var stop = false;
var pause = false;
var impFields = null;
var showDebugLog = false;
var rowNum = null;
var doWriteErrors = false;
var errorRecAdded = false;
var errCount = 0;

var lockRowRead = new Lock();
var lockErrorWrite = new Lock();
var lockReadNextRow = new Lock();
var threadsCount = 0;

var maxThreadCount = 0;
var multithreads = false;
var stop = false;

var wb = null;
var evalutor = null;
var saveThreads = 0;

var modLC = new ServerModule('moduleLC');
var modSN = new ServerModule('moduleSaldoAndSums');
    modSN.modLC= modLC;
    modLC.modSN = modSN;

//*************************************************************Служебыне функции
function addLog(aMsg){
    Logger.info(aMsg);
    if (logOutTextField != null)
    (function(){
        logOutTextField.text += aMsg;}).invokeAndWait();
}

function addErrorLog(aMsg){
    Logger.warning(aMsg);
    if (logOutTextField != null)
    (function(){
        logOutTextField.text += aMsg;
    }).invokeAndWait();
    errCount++;
}

function processPause(){
    if (pause){
        addLog('\nПауза...');
        while (pause&&!stop) {}
        if (!stop) addLog('\nпродолжаем.');
    }
}

function setProcessedCount(aCnt, aMax, aFileName){
    (function(){
        if (aFileName!=null)FileNameOut = aFileName.toString();
        filesCounter.text = aCnt+' из '+aMax + ' : ' + FileNameOut;        
    }).invokeAndWait();
}

function saveAll(aFileName){
        saveThreads++;
        var sT = new Date();
        try{
            addLog("Сохранение в БД для файла: "+aFileName);
            modLC.model.save();
            addLog("Сохранение в БД для файла: "+aFileName+ " завершено");
        }
        catch (e) {
            addErrorLog("Ошибка сохранения данных "+aFileName+" - "+e);
        }
        var eT = new Date(); 
}
//*****************************************************************Инициализация  
/* LC_FIO, 
 * LC_NUMBER,
 * LC_REG_NUM,
 * SALDO_BEG,
 * LC_CHARS(array CellNumber, CHAR_ID),
 * COUNTERS_BEG(array CellNumber, SERVICE_ID)
 * COUNTERS_END(array CellNumber, SERVICE_ID)
 * BINEFICIARIES(array CellNumber, BENEFIT_ID)
 * @returns {ImportFields}
 */
function ImportFields(){
    this.rowLength = dsRowLength.rowLength;
    var LC_FIO = dsExcelFields.find(dsExcelFields.md.impfieldtype, 1);
    this.LC_FIO = LC_FIO==''?null:LC_FIO[0].cellnumber-1;
    var LC_NUMBER = dsExcelFields.find(dsExcelFields.md.impfieldtype, 3);
    this.LC_NUMBER = LC_NUMBER==''?null:LC_NUMBER[0].cellnumber-1;
    var LC_REG_NUM = dsExcelFields.find(dsExcelFields.md.impfieldtype, 2);
    this.LC_REG_NUM = LC_REG_NUM==''?null:LC_REG_NUM[0].cellnumber-1;
    var SALDO_BEG = dsExcelFields.find(dsExcelFields.md.impfieldtype, 8);
    this.SALDO_BEG = SALDO_BEG==''?null:SALDO_BEG[0].cellnumber-1;
    
    this.LC_CHARS = new Array();
    this.COUNTERS_BEG = new Array();
    this.COUNTERS_END = new Array();
    
    var LC_CHARS = dsExcelFields.find(dsExcelFields.md.impfieldtype, 4);
    for (var i in LC_CHARS){
            this.LC_CHARS[i] = new (function(){ this.CellNumber = LC_CHARS[i].cellnumber-1;
                                                this.CHAR_ID = LC_CHARS[i].charid;
                                     });
    };
    
    
    var COUNTERS_BEG = dsExcelFields.find(dsExcelFields.md.impfieldtype, 5);
    for (i=0;i<COUNTERS_BEG.length;i++){
            this.COUNTERS_BEG[i] = new (function(){ this.CellNumber = COUNTERS_BEG[i].cellnumber-1;
                                                    this.SERVICE_ID = COUNTERS_BEG[i].serviceid;
                                     });
    }

    var COUNTERS_END = dsExcelFields.find(dsExcelFields.md.impfieldtype, 6);
    for (i=0;i<COUNTERS_END.length;i++){
            this.COUNTERS_END[i] = new (function(){ this.CellNumber = COUNTERS_END[i].cellnumber-1;
                                                    this.SERVICE_ID = COUNTERS_END[i].serviceid;
                                     });
    };
    
    var BINEFICIARIES = dsExcelFields.find(dsExcelFields.md.impfieldtype, 7);
    for (i=0;i<BINEFICIARIES.length;i++){
            this.BINEFICIARIES[i] = new (function(){   this.CellNumber = BINEFICIARIES[i].cellnumber-1;
                                                  this.BENEFIT_ID = BINEFICIARIES[i].benefit_id;
                                     });
    }
}
/*
 * 
 * @param {type} anImportType
 * @param {type} aGroup
 * @param {type} aDate
 * @param {type} aFiles
 * @param {type} aLogOut
 * @param {type} aProgress
 * @param {type} aFileCount
 * @param {type} aErFileName
 * @returns {String}
 * to do: убрать aGroup из передачи в другие функции, почистить все. Заменить aGroup на parGroup - где нужно вставлять его
 */
function initializeImport(anImportType, aGroup, aDate, aFiles, aLogOut, aProgress, aFileCount, aErFileName){
    if(anImportType==null||aGroup==null||aFiles==null)
        return "Error null parameter";
    logOutTextField = aLogOut;
    if (logOutTextField!=null)
    var startTime = new Date();
    try{
        model.requery();
        addLog('Инициализация импорта');
        try{
            //инициализация модулей
        }
        catch (e) {alert('!'+e)}
        parImportType = anImportType;
        parDate = aDate;
        impFields = new ImportFields(anImportType);
        progressInd = aProgress;
        filesCounter = aFileCount;
        errorRecAdded = false;
      /* отбаботка ошибочных записей
       *   if (impFields.impType == 2){
            doWriteErrors = aErFileName!=null?true:false;
            errorRecordModule.addSheet('Ошибки Лист1');
        }*/
        
        
        var path = aFiles.path;
        if (aFiles.isDirectory()){
            addLog('\nИмпорт файлов из директории: '+path);
            importFromFiles(aFiles, aGroup)
        }
        else {
            addLog('\nИмпорт одного файла');
            setProcessedCount( 1, 1, path);
            importFromSingleFile(path, aGroup);
        }
        if (errorRecAdded) {
            addLog("\nСохранение ошибок в файл...");
            errorRecordModule.saveErFile(aErFileName.path);
            addLog("Завершено\nУдаление ошибок из таблиц");
            importModuleAddresses.deleteErrors();
        }
    }
    catch (e){
        return "Ошибка импорта: "+e;
    }
    var endTime = new Date();
    var pT = new java.util.Calendar.getInstance();
    if (stop) addLog('\nИмпорт остановлен пользователем');
    return "ok";
}

function importFromFiles(aFiles, aGroup){
    var path = aFiles.path;
    var files = new java.io.File(aFiles).list();
    var filesCount = files.length;
    addLog("\nФайлов в папке - "+filesCount);
    for (var i=0; i<filesCount&&!stop; i++){
        if (files[i]!='.DC-Store'){
            setProcessedCount(i+1, filesCount, path + "\/" + files[i]);
            importFromSingleFile(path + "\/" + files[i], aGroup);
        }
    }
}

function importFromSingleFile(aFileName, aGroup){
    addLog("\nИмпорт из файла: "+aFileName);  
    try{
        errCount = 0;
        var fis = new java.io.FileInputStream(aFileName);
        wb = new org.apache.poi.hssf.usermodel.HSSFWorkbook(fis);
        evaluator = wb.getCreationHelper().createFormulaEvaluator();
        var startSheet = 0;
        for (var k = startSheet; k < wb.getNumberOfSheets()&&!stop; k++){
            processSheet(wb.getSheetAt(k), k, aGroup);
        }
    }
    catch (e){
        addErrorLog("Ошибка импорта из файла: "+e);
    }
    finally{
        fis.close();
        if (errCount < MAX_ERRORS_PER_LIST) {
            addLog("\nИмпорт из файла: "+aFileName+" завершен.\n")
            if (!stop||confirm('Сохранить данные из последнего файла?'))
                saveAll(aFileName);
        } else {
            addErrorLog("\nОшибка импорта из файла: "+aFileName+". Проверьте сопоставление полей\nДанные не будут сохранены!\n");
        }
    }
    return '';
}
           
function processSheet(aSheet, aSheetNum, aGroup){
    var rows = aSheet.getPhysicalNumberOfRows();
    var robot = new java.awt.Robot();
    var readNext = true;
    (function(){progressInd.maximum = rows-1;}).invokeAndWait();
    for (var rowNum = 0; (rowNum < rows)&&(errCount < MAX_ERRORS_PER_LIST)&&!stop; rowNum++) {
        processRow(aSheet, rowNum, aSheetNum, aGroup);
        while (!multithreads&&threadsCount>0) robot.delay(10);
        if (stop) break;
    }
    while (threadsCount>0&&!stop) robot.delay(500);
}

function processRow(aSheet, aRowNum, aSheetNum, aGroup){
    threadsCount++;
    if (threadsCount > maxThreadCount) maxThreadCount=threadsCount;
    if (!stop) (function(){
        try {
            var rowAr = readSheetRow(aSheet, aRowNum, aSheetNum);
            if (showDebugLog) addLog('\nСторока №'+aRowNum+':');
            if (!stop){
            if (rowAr.isOk){                
                    readRow(rowAr, aGroup);
                }
            }
            
        } catch (e) {
            addErrorLog('\n '+' Строка '+(aRowNum+1)+'. Ошибка 397: '+e);
        }
        threadsCount--;
        (function(){progressInd.value = aRowNum;}).invokeAndWait();
    }).invokeBackground();
}

/* LC_FIO, 
 * LC_NUMBER,
 * LC_REG_NUM,
 * SALDO_BEG,
 * LC_CHARS(array CellNumber, CHAR_ID),
 * COUNTERS_END(array CellNumber, SERVICE_ID)
 * BINEFICIARIES(array CellNumber, BENEFIT_ID)
 * to do: дописать код добавления льготников - помечено в комментариях
 */

function readRow(aRowAr, aGroup){
    var FIO = aRowAr.cells[impFields.LC_FIO];// aRowAr.FIO aRowAr.Array[22]
    var LC_NUM = aRowAr.cells[impFields.LC_NUMBER];
    var REG_CNT = aRowAr.cells[impFields.LC_REG_NUM];
 /**/var LC_ID = modLC.addNewLC(FIO, LC_NUM, REG_CNT, aGroup);
    var SALDO_BEG = aRowAr.cells[impFields.SALDO_BEG];
    modSN.initBegSaldo(LC_ID, parDate, SALDO_BEG?SALDO_BEG:null);
    var counterValues = {};
    var ServicesAr = {};
    
    for (var i in impFields.LC_CHARS){
        var ch_val = aRowAr.cells[impFields.LC_CHARS[i].CellNumber];
        if (ch_val) modLC.addCharToLC(LC_ID, impFields.LC_CHARS[i].CHAR_ID, ch_val);
    }
    
    for (i in impFields.COUNTERS_BEG){
        //ServicesAr[impFields.COUNTERS_BEG[i].SERVICE_ID]/*Как организовать набор данных in? для попадания только уникальных услуг*/
        counterValues[impFields.COUNTERS_BEG[i].SERVICE_ID] = {};
       // counterValues[impFields.COUNTERS_BEG[i].SERVICE_ID].serv_id = impFields.COUNTERS_BEG[i].SERVICE_ID;
        counterValues[impFields.COUNTERS_BEG[i].SERVICE_ID].begv = aRowAr.cells[impFields.COUNTERS_BEG[i].CellNumber];
    }
    
    for (i in impFields.COUNTERS_END){
        counterValues[impFields.COUNTERS_END[i].SERVICE_ID].endv = aRowAr.cells[impFields.COUNTERS_END[i].CellNumber];
    }
    
    for (i in counterValues)
        modSN.insertCounterValue(LC_ID,i , parDate, 
                                             counterValues[i].begv, 
                                             counterValues[i].endv);
    
    for (i = 0; i < impFields.BINEFICIARIES; i++){
        // Дописать код добавления льготников
    }
  //  modLC.saveChanges();
}

//****************************************************************Импорт данных******************************************************
//****************************************************************Валидация полей
function checkRow(aRowAr){
    return checkRequiredFields(aRowAr);;
}

function checkRequiredFields(aRowAr){
    var res = true;
    dsExcelFields.beforeFirst();
    while (dsExcelFields.next()&&res)
        try {
            if (dsExcelFields.isrequired&&aRowAr[dsExcelFields.cellnumber-1]==null)
                res = false;
        } catch(e) {
            res = false;
            addErrorLog('\n '+': Ошибка чтения ячейки '+dsExcelFields.cellnumber+': '+e);
        }
    return res;
}

//*****************************************************Чтение значений ячеек Excel
/* Читет и валидирует строку
 * 
 */
function readSheetRow(aSheet, aRowNum, aSheetNum){
   /* lockRowRead.lock();
    if(stop){
        lockRowRead.unlock();
        return;
    }*/
    var sT = new Date();
    try {
        var curRow = aSheet.getRow(aRowNum);
        var rowAr = new Array();
        var impOk = true;
        var db = null;
        for (var i=0; i<impFields.rowLength; i++){
            rowAr[i] = getCellValueByField(curRow, i, false);
        }
        var res = new function(){
            aRowNum++
            this.cells = rowAr;
            this.rowLength = impFields.rowLength;
            this.isOk = impOk;
            this.rowNum = aRowNum;
            this.sheetNum = aSheetNum;
        }
    }
    catch(e) {
        addErrorLog('\nСтрока '+ aRowAr.rowNum + '. Критическая ошибка чтения 448.\n'+e)
        res = new function(){
            this.isOk = false;
        }
    }
   // lockRowRead.unlock();
    return res;
}

function getCellValueByField(row, cellNumber, isDateValue){
    var cell = null;
    if (cellNumber!=null){
            cell = row.getCell(cellNumber);
            cell = cell!=null&&cell!=undefined?
                (isDateValue?getDateValue(cell)
                            :getCellValue(cell))
                :null;
        }
    return cell!=''?cell:null;
}

function checkDateCell(aCell){
    if (aCell==null) return false;
    return aCell.replace(/\d+/,'')==''?true:false;
}

function getDateValue(aCell){
    if (aCell!=null){
        var DateValue = null;
        try{DateValue = dF.parse(getCellValue(aCell));}
        catch (e) {}
        if (DateValue==null){
            DateValue = getCellValue(aCell);
            if (checkDateCell(DateValue)){
                if (DateValue>3000)
                    DateValue = aCell.getDateCellValue();
                else
                    DateValue = DateValue==null?null:new Date(getCellValue(aCell), 0, 1, 3);
            }
            else DateValue = null;
        }
    }
    return DateValue;
}

var evaluatedCellType = -1;
function getCellValue(cell) {
    var value = null;
    if (cell == null) {
        return null;
    }
    switch(cell.getCellType()){
        case cell.CELL_TYPE_BLANK:
            //addLog('CELL_TYPE_BLANK обнаружено');
            break;
        case cell.CELL_TYPE_STRING:
            value = cell.getStringCellValue();
            break;
        case cell.CELL_TYPE_NUMERIC:
            value = cell.getNumericCellValue();
            break;
        case cell.CELL_TYPE_FORMULA:
            evaluatedCellType = evaluator.evaluateFormulaCell(cell);
            switch(evaluatedCellType) {
                case cell.CELL_TYPE_NUMERIC:
                    value = cell.getNumericCellValue();
                    break;
                case cell.CELL_TYPE_STRING:
                    value = cell.getStringCellValue();
                    break;
                    
                case cell.CELL_TYPE_BOOLEAN:
                    value = cell.getBooleanCellValue();
                break;
            }
            break;
        case cell.CELL_TYPE_BOOLEAN:
            value = cell.getBooleanCellValue();
            break;
        case cell.CELL_TYPE_ERROR:
            addLog('CELL_TYPE_ERROR обнаружено');
            break;
    }
    return value == null ? null : new String(value);
}