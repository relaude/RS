﻿define(['durandal/system', 'services/logger'],
function (system, logger) {
    var referenceCheckValidator;
    var Validator = breeze.Validator;

    var orderBy = {
        orders: 'OrderID desc'
    };

    var entityNames = {
        orders: 'Orders',
        userProfile: 'UserProfile'
    };

    var model = {
        configureMetadataStore: configureMetadataStore,
        entityNames: entityNames,
        orderBy: orderBy
    };

    return model;

    //#region Internal Methods
    function configureMetadataStore(metadataStore) {
        metadataStore.registerEntityTypeCtor(
            'Orders', function () { this.isPartial = false; }, ordersInitializer);
        metadataStore.registerEntityTypeCtor(
            'UserProfile', function () { this.isPartial = false; }, userProfileInitializer);
    }

    function ordersInitializer(orders) {
        orders.errorMessage = ko.observable();
    }

    function userProfileInitializer(userProfile) {
        userProfile.errorMessage = ko.observable();
    }

    function log(msg, data, showToast) {
        logger.log(msg, data, system.getModuleId(model), showToast);
    }
    //#endregion
});