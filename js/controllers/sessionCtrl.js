myApp.controller('sessionCtrl', ['$scope', '$state', 'SessionService', function ($scope, $state, SessionService) {
    $scope.loginData = {
        email: '',
        password: ''
    }

    const login = () => {
        SessionService.createSession($scope.loginData)
            .then(resp => {
                localStorage.setItem("token", resp.data.token);

                if (resp.data.admin) {
                    localStorage.setItem("is_admin", false);
                }

                $state.go(`producerPage`)
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