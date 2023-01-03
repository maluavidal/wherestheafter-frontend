myApp.controller('registerUserCtrl', ['$scope', '$state', 'UserService', 'AlertMessage', function ($scope, $state, UserService, AlertMessage) {

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

        if (!$scope.userData.name || !$scope.userData.email || !$scope.userData.password || !$scope.userData.confirmPassword) {
            alert('Preencha todos os campos!')
            return
        }

        UserService.createUser($scope.userData)
            .then(() => {
                $state.go('loginPage');
            })
            .catch((e) => {
                if (e.data.error.includes('Email ja existe')) {
                    alert('Dados inválidos')
                }
                console.log(e)
            })
    }

    $scope.registerUser = registerUser
}])