/**
 * 
 * @author Алексей
 * @module
 */
function ImportReadProcessor() {
    var self = this, model = this.model;
    var logOutTextField = null, progressInd = null, filesCounter = null, FileNameOut = null;
    var processor = new ImportDataProcessor();
    var errCount = 0, stop = false;
    var MAX_ERRORS_PER_LIST = 100;

    function addLog(aMsg) {
        Logger.info(aMsg);
        if (logOutTextField != null)
            (function() {
                logOutTextField.text += aMsg;
            }).invokeAndWait();
    }

    function addErrorLog(aMsg) {
        Logger.warning(aMsg);
        if (logOutTextField != null)
            (function() {
                logOutTextField.text += aMsg;
            }).invokeAndWait();
        errCount++;
    }

    function processPause() {
        if (pause) {
            addLog('\nПауза...');
            while (pause && !stop) {
            }
            if (!stop)
                addLog('\nпродолжаем.');
        }
    }

    function setProcessedCount(aCnt, aMax, aFileName) {
        (function() {
            if (aFileName != null)
                FileNameOut = aFileName.toString();
            filesCounter.text = aCnt + ' из ' + aMax + ' : ' + FileNameOut;
        }).invokeAndWait();
    }

    self.startImport = function(aFiles, aLogOut, aProgress, aFileCount, aSessionId,
                                aDateId, anAccountId, aBankPercent) {
        var path = aFiles.path;
        processor.setParams(aSessionId, aDateId, anAccountId, aBankPercent);
        
        progressInd = aProgress;
        filesCounter = aFileCount;
        logOutTextField = aLogOut;
        errCount = 0;
        
        if (aFiles.isDirectory()) {
            addLog('\nИмпорт файлов из директории: ' + path);
            importFromFiles(aFiles);
        }
        else {
            addLog('\nИмпорт одного файла');
            setProcessedCount(1, 1, path);
            importFromSingleFile(path);
        }
        
        var erRec = processor.getErrors();
        addLog('\nОшибки при импорте - ' + erRec.length + '\n');
        for (var j in erRec) {
            addLog('\nЗапись: ' + erRec[j].OPL_FULL_INFO
                    + '\nДата: ' + erRec[j].OPL_DATE
                    + '\nСумма: ' + erRec[j].OPL_SUM);
        }
        
    };

    function importFromFiles(aFiles) {
        var path = aFiles.path;
        var files = new java.io.File(aFiles).list();
        var filesCount = files.length;
        addLog("\nФайлов в папке - " + filesCount);
        for (var i = 0; i < filesCount && !stop; i++) {
            if (files[i] != '.DC-Store') {
                setProcessedCount(i + 1, filesCount, path + "\/" + files[i]);
                importFromSingleFile(path + "\/" + files[i]);
            }
        }
    }

    function importFromSingleFile(aFileName) {
        var reader = new ImportSberReader();
        if (checkExtension(aFileName, reader)) {
            addLog("\nИмпорт из файла: " + aFileName);
            try {
                errCount = 0;
                processor.processData(reader.importFromFile(aFileName));
            }
            catch (e) {
                addErrorLog("Ошибка импорта из файла: " + e);
            }
            finally {
                if (errCount < MAX_ERRORS_PER_LIST) {
                    addLog("\nИмпорт из файла: " + aFileName + " завершен.\n");
                    //if (!stop || confirm('Сохранить данные из последнего файла?'))
                        //saveAll(aFileName);
                } else {
                    addErrorLog("\nОшибка импорта из файла: " + aFileName + ". Проверьте сопоставление полей\nДанные не будут сохранены!\n");
                }
            }
            return '';
        } else {
            addLog("\nФайл " + aFileName + " пропущен.\n");
        }
    }

    function checkExtension(aFile, aReader) {
        var a = aFile.split(".");
        if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) {
            var ext = "";
        }
        ext = a.pop();
        for (var j in aReader.extensions) {
            if (ext === aReader.extensions[j])
                return true;
        }
        return false;
    }
}
