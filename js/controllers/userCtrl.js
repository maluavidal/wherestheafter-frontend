myApp.controller('userCtrl', ['$scope', '$state', 'UserService'], function ($scope, $state, UserService){
    $scope.teste = 12345

    console.log($scope.teste) 
})