angular.module('chatWindow', [])
    .service('chatService', ['socketService', '$http', function(socketService, $http) {
        return {
            GetChatHistory: function(socketId, callback) {
                socketService.emit('request:chat_history', {
                    socketId: socketId
                }, function(data) {
                    callback(data.messages);
                });
            },
            SubscribeToChat: function(socketId, callback) {
                socketService.on('chat_message', function(data) {
                    //console.log(data);
                    //if (data.sender === socketId)
                    callback(data);
                });
            },
            SendMessage: function(socketId, message) {
                // console.log(message);
                socketService.emit('chat_message', {
                    recipient: socketId,
                    data: message
                });
            }
        };
    }])
    .controller('ChatWindowController', ['$scope', 'chatService', function($scope, chatService) {
        $scope.socketId = '';
        $scope.messages = [];
        $scope.typedMessage = '';
        $scope.init = function() {
            chatService.GetChatHistory($scope.socketId, function(chats) {
                angular.forEach(chats, function(chat) {
                    $scope.messages.push(chat);
                });
            });
            chatService.SubscribeToChat($scope.socketId, function(message) {
                // console.log(message);
                $scope.messages.push(message);
            });
        };

        $scope.sendMessage = function() {
            // console.log($scope.typedMessage);
            if ($scope.typedMessage !== '') {
                chatService.SendMessage($scope.socketId, $scope.typedMessage);
                $scope.typedMessage = '';
            }
        };

    }])
    .directive('chatWindow', function() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {
            //     testVar: '=test'
            // }, // {} = isolate, true = child, false/undefined = no change
            // controller: ['$scope', function($scope) {
            //     $scope.test = 'Lalala';
            // }],
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'templates/chatWindow/chatWindow.tpl.html',
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
                $scope.socketId = iAttrs.socketId;
                $scope.init();
            }
        };
    });
