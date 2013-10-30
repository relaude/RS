define(['services/reportdatacontext', 'services/ko-datatable'], function (reportdatacontext) {
    var orders = ko.observableArray();

    var activate = function () {
        // go get local data, if we have it
        moment().format('L');
        return reportdatacontext.getOrderPartials(orders);
    }

    var vm = {
        activate: activate,
        orders: orders,
        title: 'Invoice List'
    };

    return vm;
});