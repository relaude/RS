﻿require.config({
    paths: { "text": "durandal/amd/text" }
});

define(['durandal/app',
    'durandal/viewLocator',
    'durandal/system',
    'durandal/plugins/router',
    'durandal/viewEngine',
    'services/logger',
    'services/appsecurity'],
    function (app, viewLocator, system, router, viewEngine, logger, appsecurity) {

        // Enable debug message to show in the console 
        system.debug(true);

        // This stops Sammy from hijacking regular links
        //Sammy.Application.prototype.disable_push_state = true;

        app.start().then(function () {
            toastr.options.positionClass = 'toast-bottom-right';
            toastr.options.backgroundpositionClass = 'toast-bottom-right';

            router.handleInvalidRoute = function (route, params) {
                logger.logError('No Route Found', route, 'main', true);
            };

            // When finding a viewmodel module, replace the viewmodel string 
            // with view to find it partner view.
            router.useConvention();

            //default
            viewLocator.useConvention();

            //custom
            //viewLocator.useConvention('viewmodels', '../../reportservice');
            //viewEngine.viewExtension = '/';

            // Config Routes
            router.map([
				{ url: 'home', moduleId: 'viewmodels/home', name: 'Home', visible: true },
				{ url: 'orders', moduleId: 'viewmodels/orders', name: 'Orders', visible: false, settings: { authorize: ["User", "Administrator"]} },
                { url: 'register', moduleId: 'viewmodels/register', name: 'Register', visible: false },
				{ url: 'login', moduleId: 'viewmodels/login', name: 'Login', visible: false },
                { url: 'manage', moduleId: 'viewmodels/manage', name: 'Manage', visible: false, settings: { authorize: ["User", "Administrator"]} }
			]);

            // Add antiforgery => Validate on server
            appsecurity.addAntiForgeryTokenToAjaxRequests();

            // If the route has the authorize flag and the user is not logged in => navigate to login view
            router.guardRoute = function (routeInfo) {
                if (routeInfo.settings.authorize) {
                    if (appsecurity.user().IsAuthenticated && appsecurity.isUserInRole(routeInfo.settings.authorize)) {
                        return true
                    } else {
                        return "/#/login?redirectto=" + routeInfo.url;
                    }
                }
                return true;
            }

            // Configure ko validation
            ko.validation.init({
                decorateElement: true,
                errorElementClass: "has-error",
                registerExtenders: true,
                messagesOnModified: true,
                insertMessages: true,
                parseInputAttributes: true,
                messageTemplate: null
            });

            // Adapt to touch devices
            app.adaptToDevice();
            //Show the app by setting the root view model for our application.
            app.setRoot('viewmodels/shell', 'entrance');
        });
    });