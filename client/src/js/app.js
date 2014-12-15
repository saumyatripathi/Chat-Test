angular.module('chatApp', ['templatesCache', 'socketUtils', 'chatWindow'])
    .controller('UserListController', ['$scope', function($scope) {
        $scope.usersOnList = ['test1', 'test2', 'test3'];
        $scope.activeChats = [];
        $scope.startChat = function(user) {
            $scope.activeChats.push(user);
        }
    }]);
