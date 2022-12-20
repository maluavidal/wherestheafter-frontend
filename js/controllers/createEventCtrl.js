myApp.controller('createEventCtrl', ['$scope', '$state', 'EventService', function ($scope, $state, EventService) {
    $scope.event = {
        name: "",
        about: "",
        starts_at: "",
        ends_at: "", 
        min_age: "",
        price: "",
        cep: "",
        state: "",
        city: "",
        venue: "", 
        street: "",
        number: "",
        file: null
    }

    const createEvent = () => {
        EventService.createEvent($scope.event)
        .then(() => {
            $state.go('producerPage')
        })
        .catch((e) => {
            console.log(e)
        })
    }

    const onSelectFile = ($files) => {
        console.log($files)
    }

    const getAddressByCep = () => {
        EventService.getAddress($scope.event.cep).then(({ data }) => {
            $scope.event.state = data.state
            $scope.event.city = data.city
            $scope.event.street = data.street
            $scope.event.state = data.state
        }).catch(() => {
            alert('Endereco ta muito errado amigo!')
        })
    }

    $scope.createEvent = createEvent
    $scope.getAddressByCep = getAddressByCep;
    $scope.onSelectFile = onSelectFile;
}])