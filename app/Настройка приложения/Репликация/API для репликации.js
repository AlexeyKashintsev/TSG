/**
 * 
 * @name ReplicationAPI
 * @author vy
 * @module
 */
function ReplicationAPI() {
    var self = this;

    /* имя текущего пользователя Platypus (используется только для логирования) */
    var platypusUserName = self.principal.name;

    /**
     * Получить код операции для записи логов
     * 
     * @returns {Число} id записи для таблицы лога операций
     */
    self.getActionId = function() {
        var dataSource = self.model.dsGetActionId;
        dataSource.params.execute = 1;

        dataSource.requery();
        if (dataSource.size) {
            return dataSource.actionCode;
        }
        return null;
    };

    
    function prepareReplicate() {
        var dataSource = self.model.dsResult;
        dataSource.insert();
        self.model.save();
        return dataSource.id;
    }

    function getReplicateResult(aId) {
        var dataSource = self.model.dsResult;
        dataSource.params.id = aId;
        dataSource.requery();
        return dataSource.resultcode;
    }
    
    /**
     * Генерация уникального имени схемы БД
     * 
     * @returns {Строка} имя схемы 
     */
    self.generateSchemaName = function() {
        var dataSource = self.model.dsGenerateSchemaName;
        dataSource.params.execute = 1;
        dataSource.requery();
        if (dataSource.size) {
            return dataSource.schemaName;
        }
        return null;
    };

    /**
     * Узнать рабочую схему пользователя
     * 
     * @param {Строка} aPlatypusName пользователь Platypus
     * @returns {Строка} имя схемы
     */
    self.getUsrContext = function(aPlatypusName) {
        var dataSource = self.model.dsGetUsrContext;
        dataSource.params.platypusUser = aPlatypusName;
        dataSource.requery();
        if (dataSource.size === 1) {
            return dataSource.schemaName;
        }
        return null;
    };

    /**
     * Создать схему БД,
     * дать права и создать представления на все таблицы из REPLICATE_VIEWS,
     * создать последовательности с именами из таблицы REPLICATE_SEQUENCES
     * 
     * @param {Строка} aSchemaName имя создаваемой схемы
     * @returns {Объект : (число,число)} {actionId, actionResult}
     * 
     *     actionId-id операции в логе,
     *     actionResult-результат операции(
     *         0  - ошибок нет,
     *         >0 - количество ошибочных sql,
     *         -1 - явных ошибок нет, но операция выполнена, возможно, не полностью)
     */
    self.createSchema = function(aSchemaName) {
        var dataSource = self.model.dsCreateSchema;
        var ret = {actionId: self.getActionId(), actionResult: null};

        if (ret.actionId) {
            var replicateId = prepareReplicate(ret.actionId); 
            if (replicateId ) {
                dataSource.params.execute = 1;
                dataSource.params.actionId = ret.actionId;
                dataSource.params.platypusUser = platypusUserName;
                dataSource.params.schemaName = aSchemaName;
                dataSource.params.id = replicateId;
                dataSource.executeUpdate();
                ret.actionResult = getReplicateResult(replicateId);
            }
        }
        return ret;
    };

    /**
     * Удалить схему БД (данные из таблиц основной схемы для данного пользователя НЕ УДАЛЯЮТСЯ!!!)
     * 
     * @param {Строка} aSchemaName имя схемы
     * @returns {Объект : (число,число)} {actionId, actionResult}
     * 
     *     actionId-id операции в логе,
     *     actionResult-результат операции(
     *         0  - ошибок нет,
     *         >0 - количество ошибочных sql,
     *         -1 - явных ошибок нет, но операция выполнена, возможно, не полностью)
     */
    self.dropSchema = function(aSchemaName) {
        var dataSource = self.model.dsDropSchema;
        var ret = {actionId: self.getActionId(), actionResult: null};
        if (ret.actionId) {
            var replicateId = prepareReplicate(ret.actionId); 
            if (replicateId ) {
                dataSource.params.execute = 1;
                dataSource.params.actionId = ret.actionId;
                dataSource.params.platypusUser = platypusUserName;
                dataSource.params.schemaName = aSchemaName;
                dataSource.params.id = replicateId;
                dataSource.executeUpdate();
                ret.actionResult = getReplicateResult(replicateId);
            }
        }
        return ret;
    };

    /**
     * Создать представление к таблице
     *
     * @param {Строка} aSchemaName имя  схемы
     *                 (если значение не задано, то все схемы из MTD_USERS )
     * @param {Строка} aTableName  имя таблицы для задания прав доступа к ней и создания представления 
     *                 (если значение не задано, то все имена таблиц из REPLICATE_VIEWS )
     *              
     * @returns {Объект : (число,число)} {actionId, actionResult}
     * 
     *     actionId-id операции в логе,
     *     actionResult-результат операции(
     *         0  - ошибок нет,
     *         >0 - количество ошибочных sql,
     *         -1 - явных ошибок нет, но операция выполнена, возможно, не полностью)
     */
    self.createView = function(aSchemaName, aTableName) {
        var dataSource = self.model.dsCreateView;
        var ret = {actionId: self.getActionId(), actionResult: null};
        if (ret.actionId) {
            var replicateId = prepareReplicate(ret.actionId); 
            if (replicateId ) {
                dataSource.params.execute = 1;
                dataSource.params.actionId = ret.actionId;
                dataSource.params.platypusUser = platypusUserName;
                dataSource.params.schemaName = aSchemaName;
                dataSource.params.tableName = aTableName;
                dataSource.params.id = replicateId;
                dataSource.executeUpdate();
                ret.actionResult = getReplicateResult(replicateId);
            }
        }
        return ret;
    };

    /**
     * Удалить представление к таблице
     * 
     * @param {Строка} aSchemaName имя  схемы
     *                 (если значение не задано, то все схемы из MTD_USERS )
     * @param {Строка} aTableName имя таблицы (представления) 
     *                 (если значение не задано, то все имена таблиц из REPLICATE_VIEWS )
     *
     * @returns {Объект : (число,число)} {actionId, actionResult}
     * 
     *     actionId-id операции в логе,
     *     actionResult-результат операции(
     *         0  - ошибок нет,
     *         >0 - количество ошибочных sql,
     *         -1 - явных ошибок нет, но операция выполнена, возможно, не полностью)
     */
    self.dropView = function(aSchemaName, aTableName) {
        var dataSource = self.model.dsDropView;
        var ret = {actionId: self.getActionId(), actionResult: null};
        if (ret.actionId) {
            var replicateId = prepareReplicate(ret.actionId); 
            if (replicateId ) {
                dataSource.params.execute = 1;
                dataSource.params.actionId = ret.actionId;
                dataSource.params.platypusUser = platypusUserName;
                dataSource.params.schemaName = aSchemaName;
                dataSource.params.tableName = aTableName;
                dataSource.params.id = replicateId;
                dataSource.executeUpdate();
                ret.actionResult = getReplicateResult(replicateId);
            }    
        }
        return ret;
    };

    /**
     * Создать последовательность.
     * (Нумерация каждой последовательности в каждой схеме начинается с 1)
     * 
     * @param {Строка} aSchemaName  имя  схемы
     *                     (если значение не задано, то все схемы из MTD_USERS )
     * @param {Строка} aSequenceName  имя последовательности
     *                 (если значение не задано, то все имена из REPLICATE_SEQUENCES )
     *                 
     *
     * @returns {Объект : (число,число)} {actionId, actionResult}
     * 
     *     actionId-id операции в логе,
     *     actionResult-результат операции(
     *         0  - ошибок нет,
     *         >0 - количество ошибочных sql,
     *         -1 - явных ошибок нет, но операция выполнена, возможно, не полностью)
     */
    self.createSequence = function(aSchemaName, aSequenceName) {
        var dataSource = self.model.dsCreateSequence;
        var ret = {actionId: self.getActionId(), actionResult: null};
        if (ret.actionId) {
            var replicateId = prepareReplicate(ret.actionId); 
            if (replicateId ) {
                dataSource.params.execute = 1;
                dataSource.params.actionId = ret.actionId;
                dataSource.params.platypusUser = platypusUserName;
                dataSource.params.schemaName = aSchemaName;
                dataSource.params.sequenceName = aSequenceName;
                dataSource.params.id = replicateId;
                dataSource.executeUpdate();
                ret.actionResult = getReplicateResult(replicateId);
            }
        }
        return ret;
    };

    /**
     * Удалить последовательность
     * 
     * @param {Строка} aSchemaName  имя  схемы
     *                     (если значение не задано, то все схемы из MTD_USERS )
     * @param {Строка} aSequenceName  имя последовательности
     *                 (если значение не задано, то все имена из REPLICATE_SEQUENCES )
     *                 
     *
     * @returns {Объект : (число,число)} {actionId, actionResult}
     * 
     *     actionId-id операции в логе,
     *     actionResult-результат операции(
     *         0  - ошибок нет,
     *         >0 - количество ошибочных sql,
     *         -1 - явных ошибок нет, но операция выполнена, возможно, не полностью)
     */
    self.dropSequence = function(aSchemaName, aSequenceName) {
        var dataSource = self.model.dsDropSequence;
        var ret = {actionId: self.getActionId(), actionResult: null};
        if (ret.actionId) {
            var replicateId = prepareReplicate(ret.actionId); 
            if (replicateId ) {
                dataSource.params.execute = 1;
                dataSource.params.actionId = ret.actionId;
                dataSource.params.platypusUser = platypusUserName;
                dataSource.params.schemaName = aSchemaName;
                dataSource.params.sequenceName = aSequenceName;
                dataSource.params.id = replicateId;
                dataSource.executeUpdate();
                ret.actionResult = getReplicateResult(replicateId);
            }
        }
        return ret;
    };


    /**
     * Добавить/изменить описание представления
     * 
     * @param {Строка} aTableName  имя таблицы для репликации 
     *              (проверка в списке существующих таблиц не осуществляется)
     *              
     * @param {Число} aViewType  тип создаваемых преставлений
     *                 (0 - все записи: только для чтения
     *                  1 - все записи: полный доступ
     *                  2 - разделение по пользователям: полный доступ
     *                      (в таблицу добавляется поле для условия разделения))
     *                      
     * @param {Число} aNeedToRecreateView   необходимость создать представление во всех схемах, имеющихся в MTD_USERS
     *                       ( >0 - пересоздать, иначе не пересоздавать)
     *
     *
     * @returns {Объект : (число,число)} {actionId, actionResult}
     * 
     *     actionId-id операции в логе,
     *     actionResult-результат операции(
     *         0  - ошибок нет,
     *         >0 - количество ошибочных sql,
     *         -1 - явных ошибок нет, но операция выполнена, возможно, не полностью)
     */
    self.addViewDefine = function(aTableName, aViewType, aNeedToRecreateView) {
        var dataSource = self.model.dsAddViewDefine;
        var ret = {actionId: self.getActionId(), actionResult: null};
        if (ret.actionId) {
            var replicateId = prepareReplicate(ret.actionId); 
            if (replicateId ) {
                dataSource.params.execute = 1;
                dataSource.params.actionId = ret.actionId;
                dataSource.params.platypusUser = platypusUserName;
                dataSource.params.tableName = aTableName;
                dataSource.params.viewType = aViewType;
                dataSource.params.needToRecreateView = aNeedToRecreateView;
                dataSource.params.id = replicateId;
                dataSource.executeUpdate();
                ret.actionResult = getReplicateResult(replicateId);
            }
        }
        return ret;
    };

    /**
     * Удалить описание представления
     * 
     * @param {Число} aTableName  имя таблицы для репликации 
     * 
     * @param {Число} aNeedToDropView   необходимость удаления представления во всех схемах Oracle, имеющихся в MTD_USERS
     *                   ( >0 - удалить, иначе не удалять)
     *
     *
     * @returns {Объект : (число,число)} {actionId, actionResult}
     * 
     *     actionId-id операции в логе,
     *     actionResult-результат операции(
     *         0  - ошибок нет,
     *         >0 - количество ошибочных sql,
     *         -1 - явных ошибок нет, но операция выполнена, возможно, не полностью)
     */
    self.removeViewDefine = function(aTableName, aNeedToDropView) {
        var dataSource = self.model.dsRemoveViewDefine;
        var ret = {actionId: self.getActionId(), actionResult: null};
        if (ret.actionId) {
            var replicateId = prepareReplicate(ret.actionId); 
            if (replicateId ) {
                dataSource.params.execute = 1;
                dataSource.params.actionId = ret.actionId;
                dataSource.params.platypusUser = platypusUserName;
                dataSource.params.tableName = aTableName;
                dataSource.params.needToDropView = aNeedToDropView;
                dataSource.params.id = replicateId;
                dataSource.executeUpdate();
                ret.actionResult = getReplicateResult(replicateId);
            }
        }
        return ret;
    };

}
