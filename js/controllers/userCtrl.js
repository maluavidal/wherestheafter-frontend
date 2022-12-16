myApp.controller('userCtrl', ['$scope', '$state', 'UserService', function ($scope, $state, UserService) {

    $scope.userData = {
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const registerUser = () => {
        console.log('afisj');
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