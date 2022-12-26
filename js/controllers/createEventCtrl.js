myApp.controller('createEventCtrl', ['$scope', '$timeout', '$state', 'EventService', function ($scope, $timeout, $state, EventService) {

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
    };

    const createEvent = () => {
        const data = {
            ...$scope.event,
            starts_at: moment($scope.event.starts_at).format('YYYY-MM-DD'),
            ends_at: moment($scope.event.ends_at).format('YYYY-MM-DD')
        }

        EventService.createEvent(data)
            .then(() => {
            $state.go('producerPage')
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const getAddressByCep = () => {
        EventService.getAddress($scope.event.address_cep).then(({ data }) => {
            $scope.event.state = data.state
            $scope.event.city = data.city
            $scope.event.street = data.street
            $scope.event.state = data.state
        }).catch(() => {
            alert('Endereço inválido')
        })
    }

    const getImageThumbUrl = file => {
        // -- AWS BUCKET-S3

        return new Promise(resolve => {
            const reader = new FileReader();
    
            reader.readAsDataURL(file);
    
            reader.onload = () => {
                resolve(reader.result);
            }
        });
    }

    const uploadFile = async files => {
        if (!files || !files.length) return;
        const fileNoBase64 = files[0];

        $scope.thumbUrl = await getImageThumbUrl(fileNoBase64);

        $timeout(() => {
            $scope.event.file = fileNoBase64;
        }) 
    };

    $scope.createEvent = createEvent
    $scope.uploadFile = uploadFile;
    $scope.getAddressByCep = getAddressByCep;
}])