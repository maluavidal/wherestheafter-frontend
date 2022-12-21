myApp.controller("recoverPasswordCtrl", ['$scope', "RecoverPasswordService", "AlertMessage", "$state", function($scope, RecoverPasswordService, AlertMessage, $state) {
    $scope.form = {
      email: '',
    };
  
    const isValid = () => {
      if (!$scope.form.email) {
          AlertMessage.error("Informe um email!");
          return false;
      }
  
      if ($scope.form.email.length < 10) {
          AlertMessage.error("O email deve conter no mínimo 10 caracteres!");
          return false;
      }
  
      return true;
    };
  
    $scope.submitForm = () => {
      if (!isValid()) {
          return;
      }
  
      RecoverPasswordService.recovery($scope.form)
        .then(() => {
          AlertMessage.success("Solicitação enviada com sucesso!")
          $state.go("login");
        }).catch(() => {
          AlertMessage.error("Erro ao enviar sua solicitação!")
        });
  };
  }]);