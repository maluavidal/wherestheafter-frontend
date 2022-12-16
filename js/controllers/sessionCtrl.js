myApp.controller('sessionCtrl', ['$scope', '$state', 'SessionService', function ($scope, $state, SessionService){
    $scope.loginData = {
        email: '',
        password: ''
    }

    const login = () => {
        SessionService.createSession($scope.loginData)
        .then(resp => {
            localStorage.setItem("token", resp.data.token);

            if (resp.data.admin) {
                localStorage.setItem("is_admin", true);
            }
            
            $state.go(`producerPage`)
        })   
        .catch((err) => {
            // alert()
        })
    }

    $scope.login = login
}])