myApp.controller("changePasswordCtrl", ['$scope', "RecoverPasswordService", "AlertMessage", "$state", "$location", function ($scope, RecoverPasswordService, AlertMessage, $state, $location) {
  $scope.form = {
    password: '',
    password_confirmation: '',
    token: $location.search().token
  };

  $scope.isTokenValid = false;

  const init = () => {
    RecoverPasswordService.validateToken($scope.form.token)
      .then(() => {
        $scope.isTokenValid = true;
      }).catch(() => {
        AlertMessage.error("TOKEN EXPIRADO!")
        $state.go('login')
      });
  };

  const isValid = () => {
    if (!$scope.form.password) {
      AlertMessage.error("Insira a senha!")
      return false;
    }

    if (!$scope.form.password_confirmation) {
      AlertMessage.error("Insira a confirmação da senha!")
      return false;
    }

    if ($scope.form.password !== $scope.form.password_confirmation) {
      AlertMessage.error("As senhas não conferem!")
      return false;
    }

    return true;
  };

  $scope.submitNewPassword = () => {
    if (!isValid()) {
      return;
    }

    RecoverPasswordService.changePassword($scope.form)
      .then(() => {
        AlertMessage.success("Acesso redefinido com sucesso!")
        $state.reload();
        $state.go("home");
      }).catch(() => {
        AlertMessage.error("Erro ao redefinir acesso!")
      });

  };

  init();

}]);