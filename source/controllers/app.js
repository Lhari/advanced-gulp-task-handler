var puckWebApp = angular.module('myModule', []);
puckWebApp.controller('StreamerController', StreamerController);
puckWebApp.controller('frontpageController', frontpageController);

function StreamerController ($scope, $timeout, $http) {
    
    var timer;

       function myLoop() {
           
            $http.get('./assets/json/streamer.json')
            .success(function(response) {$scope.streamer = response;});

                    timer = $timeout (
                        function() { 
                            console.log( "Timeout executed", Date.now() ); 
                        },
                        3000
                    );
  
                    
                    timer.then(
                        function() { 
                            myLoop();
 
                        },
                        function() { 
                            console.log( "Failed collecting Data, check JSON" ); 
                        }
                    );
                }

                myLoop();

                    $scope.$on(
                        "$destroy",
                        function( event ) { 
                            $timeout.cancel( timer ); 
                        }
                    );
    
};

function frontpageController($scope,$http) {
    $http.get('./assets/json/frontpage.json')
    .success(function(response) {$scope.frontpage = response;});
}

puckWebApp.$inject = ['$scope','$timeout'];