myApp.controller('checkoutCtrl', ['$scope', '$state', 'EventsClientService', 'EventService', 'ClientService', 'PdfService', 'PaymentService', function ($scope, $state, EventsClientService, EventService, ClientService, PdfService, PaymentService) {

    const id = $state.params.eventId;

    const getEvent = () => {
        EventService.showEvent(id)
            .then(resp => {
                $scope.event = resp.data
                $scope.datetimeStart = moment($scope.event.starts_at).locale('pt-BR').format("D MMM [-] YYYY [•] HH:mm");
                $scope.datetimeEnd = moment($scope.event.ends_at).locale('pt-BR').format("D MMM [-] YYYY [•] HH:mm");
                $scope.dateStart = moment($scope.event.starts_at).format("DD/MM/YYYY");
            })
            .catch((e) => {
                console.log(e);
            })
    }

    getEvent();

    $scope.clientData = {
        name: '',
        cpf: '',
        email: '',
        born_at: '',
    };

    const validateCPF = (CPF) => {
        let sum;
        let rest;
        sum = 0;
        if (CPF == "00000000000") return false;

        for (i = 1; i <= 9; i++) sum = sum + parseInt(CPF.substring(i - 1, i)) * (11 - i);
        rest = (sum * 10) % 11;

        if ((rest == 10) || (rest == 11)) rest = 0;
        if (rest != parseInt(CPF.substring(9, 10))) return false;

        sum = 0;
        for (i = 1; i <= 10; i++) sum = sum + parseInt(CPF.substring(i - 1, i)) * (12 - i);
        rest = (sum * 10) % 11;

        if ((rest == 10) || (rest == 11)) rest = 0;
        if (rest != parseInt(CPF.substring(10, 11))) return false;
        return true;
    }

    const registerClient = () => {

        const CPF = $scope.clientData.cpf

        const isCPFValid = validateCPF(CPF)

        const clientBirthDate = {
            ...$scope.clientData,
            born_at: moment($scope.clientData.born_at).format('YYYY-MM-DD HH:mm')
        };

        const dateToValidate = clientBirthDate.born_at.isValid()

        // if (!dateToValidate.isValid()){
        //     alert('Data inválida')
        // }

        if (!$scope.clientData.name ||
            !CPF ||
            !$scope.clientData.email ||
            !clientBirthDate) {
            alert('Preencha todos os campos!')
            return
        }

        if (!isCPFValid) {
            alert('CPF inválido.')
            return
        }

        return ClientService.createClient(clientBirthDate)
            .then(({ data }) => {
                $state.go('checkout2', {
                    eventId: id,
                    clientId: data.id
                })
            })
    }

    // $scope.pattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    $scope.registerClient = registerClient

}])