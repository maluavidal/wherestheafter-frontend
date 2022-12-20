myApp.controller('userCtrl', ['$scope', '$state', 'UserService', function ($scope, $state, UserService) {

    $scope.userData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const registerUser = () => {
        UserService.createUser($scope.userData)
            .then(() => {
                $state.go('loginPage');
            })
            .catch((e) => {
                console.log(e)
            })
    }

    $scope.registerUser = registerUser
}])