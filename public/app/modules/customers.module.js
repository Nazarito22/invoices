var customers = angular.module('customers', ['ngRoute']);

customers.factory('customersFactory', function ($http) {

    var factory = {};

    factory.getItems = function () {
        return $http.get('/api/customers');
    };

    factory.addItem = function (customer) {
        return $http.post('/api/customers/', customer);
    };

    factory.deleteItem = function (data) {
        return $http.delete('/api/customers/' + data.id);
    };

    return factory;
});

customers.controller('CustomersCtrl', function ($scope, $http, customersFactory) {

    customersFactory.getItems().then(function(response){
        $scope.customers = response.data;
    });

    $scope.addItem = function addItem(customer, customersForm) {
        if (customersForm.$valid) {
            customersFactory.addItem(customer).then(function (response) {
                $scope.customers.push(response.data);
            });
        }
    };

    $scope.removeItem = function removeItem(data) {
        customersFactory.deleteItem(data).then(function () {
            var index = $scope.customers.indexOf(data);
            $scope.customers.splice(index, 1);
        });
    };
});