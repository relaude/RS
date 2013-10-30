define(function () {
    var remoteServiceName = 'api/report';

    var routes = [{
        url: 'home',
        moduleId: 'viewmodels/home',
        name: 'Home',
        visible: true
    }, {
        url: 'orders',
        moduleId: 'viewmodels/orders',
        name: 'Orders',
        visible: true
    }];

    var startModule = 'home';
});