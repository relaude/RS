define(['services/appsecurity', 'services/utils'],
    function (appsecurity, utils) {
        var foreignKeyInvalidValue = 0;

        var self = {
            extendMetadata: extendMetadata
        };

        return self;

        function extendMetadata(metadataStore) {
            extendCategory(metadataStore);
        }

        function extendOrders(metadataStore) {
            var ordersCtor = function () {
                this.orderID = ko.observable(breeze.core.getUuid());
            };
            metadataStore.registerEntityTypeCtor('Orders', ordersCtor);
        }

        function ensureEntityType(obj, entityTypeName) {
            if (!obj.entityType || obj.entityType.shortName !== entityTypeName) {
                throw new Error('Object must be an entity of type ' + entityTypeName);
            }
        }

        function addValidationRules(entity) {
            var entityType = entity.entityType,
                i,
                property,
                propertyName,
                propertyObject,
                validators,
                u,
                validator,
                nValidator;

            if (entityType) {
                for (i = 0; i < entityType.dataProperties.length; i += 1) {
                    property = entityType.dataProperties[i];
                    propertyName = property.name;
                    propertyObject = entity[propertyName];
                    validators = [];

                    for (u = 0; u < property.validators.length; u += 1) {
                        validator = property.validators[u];
                        nValidator = {
                            propertyName: propertyName,
                            validator: function (val) {
                                var error = this.innerValidator.validate(val, { displayName: this.propertyName });
                                this.message = error ? error.errorMessage : "";
                                return error === null;
                            },
                            message: "",
                            innerValidator: validator
                        };
                        validators.push(nValidator);
                    }
                    propertyObject.extend({
                        validation: validators
                    });
                }

                for (i = 0; i < entityType.foreignKeyProperties.length; i += 1) {
                    property = entityType.foreignKeyProperties[i];
                    propertyName = property.name;
                    propertyObject = entity[propertyName];

                    validators = [];
                    for (u = 0; u < property.validators.length; u += 1) {
                        validator = property.validators[u];
                        nValidator = {
                            propertyName: propertyName,
                            validator: function (val) {
                                var error = this.innerValidator.validate(val, { displayName: this.propertyName });
                                this.message = error ? error.errorMessage : "";
                                return error === null;
                            },
                            message: "",
                            innerValidator: validator
                        };
                        validators.push(nValidator);
                    }
                    propertyObject.extend({
                        validation: validators
                    });
                    if (!property.isNullable) {
                        //Bussiness Rule: 0 is not allowed for required foreign keys
                        propertyObject.extend({ notEqual: foreignKeyInvalidValue });
                    }
                }
            }
        }

        function addhasValidationErrorsProperty(entity) {

            var prop = ko.observable(false);

            var onChange = function () {
                var hasError = entity.entityAspect.getValidationErrors().length > 0;
                if (prop() === hasError) {
                    // collection changed even though entity net error state is unchanged
                    prop.valueHasMutated(); // force notification
                } else {
                    prop(hasError); // change the value and notify
                }
            };

            onChange();             // check now ...
            entity.entityAspect // ... and when errors collection changes
                .validationErrorsChanged.subscribe(onChange);

            // observable property is wired up; now add it to the entity
            entity.hasValidationErrors = prop;
        }
    });