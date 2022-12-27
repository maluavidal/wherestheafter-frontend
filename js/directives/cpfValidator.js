myApp.directive("cpfValidator", ["$mdDialog", function($mdDialog) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        function isValidCpf(cpf) {
          cpf = cpf.replace(/[^\d]+/g, '');
          if (cpf == '') return false;
   
        if (cpf.length != 11 ||
          cpf == "00000000000" ||
          cpf == "11111111111" ||
          cpf == "22222222222" ||
          cpf == "33333333333" ||
          cpf == "44444444444" ||
          cpf == "55555555555" ||
          cpf == "66666666666" ||
          cpf == "77777777777" ||
          cpf == "88888888888" ||
          cpf == "99999999999")
          return false;

        var add = 0;
        for (var i = 0; i < 9; i++)
          add += parseInt(cpf.charAt(i)) * (10 - i);
        var rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
          rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
          return false;
        // Valida 2o digito 
        add = 0;
        for (i = 0; i < 10; i++)
          add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
          rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
          return false;
        return true;
      }
			
      element.bind("blur", function(event) {
        if (modelCtrl.$viewValue &&
				    modelCtrl.$viewValue.length  === 11) {
          if (!isValidCpf(modelCtrl.$viewValue)) {
            $mdDialog.show(
              $mdDialog.alert()
              .parent(angular.element(document.querySelector('body')[0]))
              .clickOutsideToClose(true)
              .title('CPF inválido')
              .textContent('O CPF informado não é um cpf válido. Confira o número digitado e tente novamente.')
              .ariaLabel('Alerta de CPF inválido')
              .ok('Vou tentar novamente')
              .targetEvent(event)
            );
          }
        }
      });
    }
  }
}]);
