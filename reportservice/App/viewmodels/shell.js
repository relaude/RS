define(['durandal/system',
        'durandal/plugins/router',
        'services/logger',
        'durandal/app',
        'services/appsecurity',
        'services/reportdatacontext',
        'services/errorhandler'],
    function (system, router, logger, app, appsecurity, reportdatacontext, errorhandler) {
        var shell = {
            activate: activate,
            router: router,
            appsecurity: appsecurity,
            logout: function () {
                var self = this;
                appsecurity.logout().fail(self.handlevalidationerrors);
            }
        };

        errorhandler.includeIn(shell);

        return shell;

        //#region Internal Methods
        function activate() {
            var self = this;

            return reportdatacontext
                .primeData()
                .then(boot)
                .fail(failedInitialization);
        }

        function boot() {
            log('Welcome to Report Service!', null, true);
            return router.activate('home');
        }

        function failedInitialization(error) {
            var msg = 'App initialization failed: ' + error.message;
            logger.logError(msg, error, system.getModuleId(shell), true);
        }

        function log(msg, data, showToast) {
            logger.log(msg, data, system.getModuleId(shell), showToast);
        }
        //#endregion
    });