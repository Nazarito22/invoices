var products = angular.module('products', ['ngRoute']);

products.factory('productsFactory', function ($http) {

    var factory = {};

    factory.getItems = function () {
        return $http.get('/api/products');
    };

    factory.addItem = function (invo) {
        return $http.post('/api/products/', invo);
    };

    factory.deleteItem = function (data) {
        return $http.delete('/api/products/' + data.id);
    };

    return factory;
});

products.component('productsComponent', {
    controller: function (productsFactory) {

        var vm = this;

        productsFactory.getItems().then(function (response) {
            vm.products = response.data;

            console.log(vm.products);
        });

        vm.addItem = function addItem(product, customersForm) {
            if (customersForm.$valid) {
                productsFactory.addItem(product).then(function (response) {
                    vm.products.push(response.data);
                });
            }
        };

        vm.removeItem = function removeItem(data) {
            productsFactory.deleteItem(data).then(function () {
                var index = vm.products.indexOf(data);
                vm.products.splice(index, 1);
            });
        };
    },
    templateUrl: '/app/templates/products.template.html'
});