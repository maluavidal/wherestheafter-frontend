myApp.controller('userProfileCtrl', ['$scope', '$state', 'UserService', 'AlertMessage', '$location', function ($scope, $state, UserService, AlertMessage, $location) {

    const id = $state.params.userId

    const getUser = () => {
        UserService.showUser()
            .then(resp => {
                $scope.user = {
                    ...resp.data,
                    token: $location.search().token
                };
                console.log($scope.user)
            })
    }

    getUser()

    const updateUser = () => {
        if ($scope.user.password && !$scope.user.old_password) {
            alert('Preencha o campo nova senha')
            return
        }

        UserService.updateUser($scope.user)
            .then(() => {
                $state.go('producerPage',
                    userId = id)
            }).catch((err) => {
                if (err.data.error.includes('Senha invalida')) {
                    alert('Senha antiga inválida!')
                }
                $state.go('login')
            });
    }

    $scope.updateUser = updateUser


}])