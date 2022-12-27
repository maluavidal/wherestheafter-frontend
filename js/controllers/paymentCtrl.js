myApp.controller('paymentCtrl', ['$scope', '$state', 'EventsClientService', 'PdfService', 'PaymentService', '$timeout', function ($scope, $state, EventsClientService, PdfService, PaymentService, $timeout) {

    const eventId = $state.params.eventId;
    const clientId = $state.params.clientId;

    $scope.paymentMethods = [
        {
            name: 'VISA', 
            type: 'DÉBITO',
            value: 'visa_debito'
        },
        {
            name: 'VISA', 
            type: 'CRÉDITO',
            value: 'visa_credito'
        },
        {
            name: 'MASTERCARD', 
            type: 'DÉBITO',
            value: 'mastercard_debito'
        },
        {
            name: 'MASTERCARD', 
            type: 'CRÉDITO',
            value: 'mastercard_credito'
        },
        {
            name: 'ELO', 
            type: 'DÉBITO',
            value: 'elo_debito'
        },
        {
            name: 'ELO', 
            type: 'CRÉDITO',
            value: 'elo_credito'
        },
        {
            name: 'PIX', 
            type: 'CRÉDITO EM CONTA',
            value: 'credito_em_conta'
        },
    ]

    const generatePdf = (paymentId) => {
        return PdfService.generatePdf(paymentId)
    }

    $scope.paymentData = {
        card_number: '',
        expiration_date: '',
        security_code: '',
        cardholder_name: '',
        cardholder_birthdate: '',
        cpf: '',
    }

    const validateCPF = (CPF) => {
        var sum;
        var rest;
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

    const executePayment = () => {
        const CPF = $scope.paymentData.cpf;

        const isCPFValid = validateCPF(CPF);

        if (!$scope.paymentData.card_number ||
            !CPF ||
            !$scope.paymentData.expiration_date ||
            !$scope.paymentData.security_code ||
            !$scope.paymentData.cardholder_name ||
            !$scope.paymentData.cardholder_birthdate ||
            !$scope.paymentData.cpf) {
            alert('Preencha todos os campos!')
            return
        }

        if (!isCPFValid) {
            alert('CPF inválido.')
            return
        }

        PaymentService.executePayment(clientId, eventId, $scope.paymentData)
        .then((resp) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Compra realizada com sucesso!',
                showConfirmButton: true,
                timer: 3000
              })

            const paymentId = resp.data.id

            generatePdf(paymentId).then(resp => {
                window.open(resp.data, '_blank')
                $state.go('home')
            })
            .catch((e) => {
                console.log(e);
            })
        })
        .catch((e) => {
            console.log(e);
        })
    }
    
    $scope.executePayment = executePayment

}])
