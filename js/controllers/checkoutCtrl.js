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


    const registerClientEvent = () => {
        console.log($scope.clientData, 'DATA');
        const clientBirthDate = {
            ...$scope.clientData,
            born_at: moment($scope.clientData.born_at).format('YYYY-MM-DD HH:mm')
        };

        return ClientService.createClient(clientBirthDate).then(({data}) => {
            console.log(data, 'resp')
            $state.go('checkout2', {
                eventId: id, 
                clientId: data.id
            })
        })
    }

    $scope.registerClientEvent = registerClientEvent

    
}])