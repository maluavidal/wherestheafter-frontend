myApp.controller('userProfileCtrl', ['$scope', '$state', 'UserService', function ($scope, $state, UserService) {

    const getUser = () => {
        UserService.showUser()
        .then(resp => {
            $scope.user = resp.data;
            console.log($scope.user)
        })
    }

    getUser()
}])