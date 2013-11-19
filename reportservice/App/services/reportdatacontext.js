define(['durandal/system',
    'services/model',
    'services/logger',
    'services/breeze.partial-entities'],
    function (system, model, logger, partialMapper) {
        var EntityQuery = breeze.EntityQuery;
        var manager = configureBreezeManager();
        var orderBy = model.orderBy;
        var entityNames = model.entityNames;

        var getOrderPartials = function (ordersObservable, forceRemote) {

            if (!forceRemote) {
                var ord = getLocal('Orders', orderBy.orders);
                if (ord.length > 0) {
                    ordersObservable(ord);
                    return Q.resolve();
                }
            }

            var query = EntityQuery.from('Orders')
                        .select("OrderID,OrderDate,ShipName")
                        .orderBy("OrderID desc");

            return manager.executeQuery(query)
                .then(querySucceeded)
                .fail(queryFailed);

            function querySucceeded(data) {
                var list = partialMapper.mapDtosToEntities(
                    manager, data.results, entityNames.orders, 'OrderID');
                if (ordersObservable) {
                    ordersObservable(list);
                }
                log('Retrieved [Orders] from remote data source',
                    data, true);
            }
        };

        var primeData = function () {
            var promise = Q.all([
                getOrderPartials(null, true)]);

            return promise.then(success);

            function success() {
                reportdatacontext.lookups = {
                    orders: getLocal('Orders', orderBy.orders)
                };
                log('Primed data', reportdatacontext.lookups);
            }

        };

        var reportdatacontext = {
            getOrderPartials: getOrderPartials,
            primeData: primeData,
            ajaxRequest: ajaxRequest
        };

        return reportdatacontext;

        //#region internal method
        function getLocal(resource, ordering) {
            var query = EntityQuery.from(resource)
                .orderBy(ordering);
            return manager.executeQueryLocally(query);
        }

        function getErrorMessages(error) {
            var msg = error.message;
            if (msg.match(/validation error/i)) {
                return getValidationMessages(error);
            }
            return msg;
        }

        function configureBreezeManager() {
            //breeze.NamingConvention.camelCase.setAsDefault();
            var mgr = new breeze.EntityManager('api/report');
            model.configureMetadataStore(mgr.metadataStore);
            return mgr;
        }

        function queryFailed(error) {
            var msg = 'Error retreiving data. ' + error.message;
            logError(msg, error);
            throw error;
        }

        function log(msg, data, showToast) {
            logger.log(msg, data, system.getModuleId(reportdatacontext), showToast);
        }

        function logError(msg, error) {
            logger.logError(msg, error, system.getModuleId(reportdatacontext), true);
        }


        function ajaxRequest(type, url, data, dataType) { // Ajax helper
            var options = {
                dataType: dataType || "json",
                contentType: "application/json",
                cache: false,
                type: type,
                data: data ? data.toJson() : null
            };
            var antiForgeryToken = $("#antiForgeryToken").val();
            if (antiForgeryToken) {
                options.headers = {
                    'RequestVerificationToken': antiForgeryToken
                }
            }
            return $.ajax(url, options);
        }
        //#endregion

    });