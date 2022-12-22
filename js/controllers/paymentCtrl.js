myApp.controller('paymentCtrl', ['$scope', '$state', 'EventsClientService', 'PdfService', 'PaymentService', function ($scope, $state, EventsClientService, PdfService, PaymentService) {

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

    const generatePdf = () => {
        PdfService.generatePdf()
        .then(resp => {
            window.open(resp.data, '_blank')
        })
        .catch((e) => {
            console.log(e);
        })

    }

    $scope.paymentData = {
        card_number: '',
        expiration_date: '',
        security_code: '',
        cardholder_name: '',
        cardholder_birthdate: '',
        cpf: '',
    }

    const executePayment = () => {
        PaymentService.executePayment(clientId, eventId, $scope.paymentData)
        .then(() => {
            generatePdf()
        })
        .catch((e) => {
            console.log(e);
        })
    }
    
    $scope.executePayment = executePayment

}])
