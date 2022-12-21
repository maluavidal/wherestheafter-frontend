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

    $scope.paymentMethods = [
        {
            name: 'VISA', 
            type: 'DÉBITO'
        },
        {
            name: 'VISA', 
            type: 'CRÉDITO'
        },
        {
            name: 'MASTERCARD', 
            type: 'DÉBITO'
        },
        {
            name: 'MASTERCARD', 
            type: 'CRÉDITO'
        },
        {
            name: 'ELO', 
            type: 'DÉBITO'
        },
        {
            name: 'ELO', 
            type: 'CRÉDITO'
        },
        {
            name: 'PIX', 
            type: 'CRÉDITO EM CONTA'
        },

        
    ]

    const changevalue = () => {
        console.log($scope.method)
    }

    $scope.clientData = {
        name: '',
        cpf: '',
        email: '',
        born_at: ''
    }

    const registerClient = (data) => {
        console.log(data);
        const clientBirthDate = {
            ...data,
            born_at: moment(data.born_at, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm')
        };

        console.log(clientBirthDate, 'clientBirthDate')

        return ClientService.createClient(clientBirthDate)
            .then(() => {
                $scope.firstStepBlocked = true
            })
    }

    $scope.registerClient = registerClient

    const generatePdf = (data) => {
        PdfService.generatePdf(data)
        .then(resp => {
            window.open(resp.data)
        })
        .catch((e) => {
            console.log(e);
        })

    }

    $scope.changevalue = changevalue

    // const createEventsClient = (data) => {
    //     EventsClientService.createEventsClient(data)
    //     .then(resp => {
    //         console.log(resp)

    //     })
    // }

    // createEventsClient()

    $scope.paymentData = {
        card_number: '',
        expiration_date: '',
        security_code: '',
        cardholder_name: '',
        cardholder_birthdate: '',
        cpf: ''
    }

    const executePayment = () => {
        PaymentService.executePayment($scope.paymentData)
        .then(() => {
            generatePdf()
        })
        .catch((e) => {
            console.log(e)
        })
    }
    
    $scope.executePayment = executePayment

}])