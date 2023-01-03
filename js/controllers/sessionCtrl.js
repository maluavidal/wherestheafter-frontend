myApp.controller('sessionCtrl', ['$scope', '$state', 'SessionService', 'UserService', '$window', function ($scope, $state, SessionService, UserService, $window) {


    const getUser = () => {
        const id = $window.localStorage.getItem('user_id')
        UserService.showUser(id)
            .then(resp => {
                $scope.user = resp.data
            })
    }

    getUser()

    $scope.loginData = {
        email: '',
        password: ''
    }

    const login = () => {
        console.log($scope.loginData);
        SessionService.createSession($scope.loginData)
            .then(resp => {
                localStorage.setItem("user_id", resp.data.id);
                localStorage.setItem("token", resp.data.token);

                if (!resp.data.is_admin) {
                    localStorage.setItem("is_admin", false);
                    $state.go(`producerPage`)

                } else {
                    localStorage.setItem("is_admin", true);
                    $state.go('adminPage')
                }

            })
            .catch(async (err) => {
                console.log(err);

                let confirmation;

                if (err.data.error === 'User is currently blocked.') {

                    confirmation = await Swal.fire({
                        title: 'Bloqueado',
                        text: 'O usuário foi bloqueado, entre em contato com o suporte.',
                        icon: 'error',
                        confirmButtonColor: '#1F1F21',
                    });

                }
                else {
                    confirmation = await Swal.fire({
                        title: 'Algo deu errado',
                        text: 'Dados inválidos',
                        icon: 'error',
                        confirmButtonColor: '#1F1F21',
                    });

                }

                if (!confirmation.isConfirmed) {
                    return;
                }
            })
    }

    const logout = () => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Você será deslogado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deslogar'
        }).then((result) => {
            if (result.isConfirmed) {
                $state.go('home')
                SessionService.logout()
            }
        })
    }

    $scope.login = login;
    $scope.logout = logout;
}])