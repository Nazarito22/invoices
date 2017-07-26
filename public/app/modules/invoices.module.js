var invoices = angular.module('invoices', ['ngRoute']);

invoices.factory('invoicesFactory', function ($http) {

    var factory = {};

    factory.getItems = function () {
        return $http.get('/api/invoices');
    };
    factory.addItem = function (invo) {
        return $http.post('/api/invoices/', invo);
    };
    factory.deleteItem = function (data) {
        return $http.delete('/api/invoices/' + data.id);
    };
    factory.getInvoicesItems = function (data) {
        return $http.get('/api/invoices/' + data + '/items');
    };
    factory.addInvoicesItem = function (invItem,id) {
        return $http.post('/api/invoices/'+ id +'/items/',invItem);
    };
    factory.deleteInvoicesItem = function (invItem,id) {
        return $http.delete('/api/invoices/'+ id +'/items/' + invItem.id);
    };
    return factory;
});

invoices.controller('InvoicesCtrl', function ($scope, $resource, invoicesFactory) {
    $scope.totalInvoice = 0;
    invoicesFactory.getItems().then(function (response) {
        $scope.invoices = response.data;
    });

    var customers = $resource("/api/customers");
    $scope.customers = customers.query();

    var products = $resource("/api/products");
    $scope.products = products.query();

    var arr = invoicesFactory.getItems().then(function (response) {
        return response.data;
    });

    for (var i = 0; i < arr.length; i++) {
        $scope.totalInvoice = $scope.totalInvoice + parseInt(arr[i].total);
    }

    $scope.addItem = function addItem(invo, invoicesForm) {
        if (invoicesForm.$valid) {

            invoicesFactory.addItem(invo).then(function (response) {
                $scope.invoices.push(response.data);
            });
        }
    };

    $scope.removeItem = function removeItem(data) {
        invoicesFactory.deleteItem(data).then(function () {
            var index = $scope.invoices.indexOf(data);
            $scope.invoices.splice(index, 1);
        });
    };
});

invoices.controller('InvoicesItemCtrl', function ($scope, $http, $resource, $location, $routeParams, invoicesFactory) {

    $scope.prod_id = $routeParams.id;
    var products = $resource("/api/products");
    $scope.products = products.query();

    invoicesFactory.getInvoicesItems($scope.prod_id).then(function (response) {
        $scope.invoiceItems = response.data;
        // for (var i = 0; i < $scope.invoiceItems.length; i++) {
        //     $scope.invoiceItems[i].product_id = $scope.products[i].name;
        // }
    });
    $scope.addProduct = function addItem(invItem, invoicesAddProduct) {

        if (invoicesAddProduct.$valid) {
            invoicesFactory.addInvoicesItem(invItem,$scope.prod_id).then(function (response) {
                $scope.invoiceItems.push(response.data);
            });
        }
    };
    $scope.removeProduct = function removeProduct(data) {
        invoicesFactory.deleteInvoicesItem(data,$scope.prod_id).then(function () {
            var index = $scope.invoiceItems.indexOf(data);
            $scope.invoiceItems.splice(index, 1);
        });
    };
});