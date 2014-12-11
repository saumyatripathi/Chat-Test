angular.module('chatWindowDirective', [])
    .controller('ChatWindowController', ['$scope', function($scope) {
        $scope.test1 = 'Test 1';
        $scope.test2 = 'Test 2';
    }])
    .directive('chatWindow', function() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                testVar: '=test'
            }, // {} = isolate, true = child, false/undefined = no change
            // controller: function($scope) {
            //     $scope.target;
            //     $scope.chatMessages = [];
            //     $scope.testVar = 'Test';
            // },
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'templates/chatWindow/chatWindow.tpl.html',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            // link: function($scope, iElm, iAttrs, controller) {

            // }
        };
    });
