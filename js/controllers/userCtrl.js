myApp.controller('userCtrl', ['$scope', '$state', 'UserService', function ($scope, $state, UserService) {

    $scope.userData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    $scope.passwordMatch = true

    const registerUser = () => {
        if ($scope.userData.password !== $scope.userData.confirmPassword) {
            $scope.passwordMatch = false;
            return
        }

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