mockApp.config(['$routeProvider','$locationProvider','$resourceProvider',
    function config($routeProvide,$locationProvider,$resourceProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvide.
            when('/products', {
                template: '<products-component></products-component>'
            }).
            when('/invoices', {
                templateUrl: '/app/templates/invoices.template.html',
                controller: 'InvoicesCtrl'
            }).
            when('/invoices/:id', {
                templateUrl: '/app/templates/invoices-item.template.html',
                controller: 'InvoicesItemCtrl'
            }).
            when('/customers', {
                templateUrl: '/app/templates/customers.template.html',
                controller: 'CustomersCtrl'
            }).
            otherwise({
                redirectTo: '/invoices'
            });
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }
]);