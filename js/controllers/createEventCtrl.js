myApp.controller('createEventCtrl', ['$scope', '$timeout', '$state', 'EventService', function ($scope, $timeout, $state, EventService) {

    $scope.event = {
        name: "",
        about: "",
        starts_at: "",
        ends_at: "",
        min_age: "",
        price: null,
        cep: "",
        state: "",
        city: "",
        venue: "",
        street: "",
        number: "",
        tickets_amount: "",
        file: null
    }; 

    $scope.fillRequiredFields = false

    $scope.ages = [18, 16]
    
    const createEvent = () => { 
        function addHours(date, hours) {
            const endDate = moment(date).add(hours, 'hours')
            return new Date(endDate);
        }
        
        const data = {
            ...$scope.event,
            starts_at: new Date($scope.event.starts_at),
            ends_at: new Date($scope.event.ends_at),
        }
        
        if (!$scope.event.name || !$scope.event.starts_at || !$scope.event.state || !$scope.event.city || !$scope.event.venue || !$scope.event.tickets_amount || !$scope.event.file) {
            alert('Preencha os campos obrigatórios!')
            $scope.fillRequiredFields = true
            return
        }

        if (!$scope.event.ends_at) {
            data.ends_at = addHours(data.starts_at, 5)
        }

        if (!$scope.event.number) {
            $scope.event.number = 'S/N'
        }

        if (!$scope.event.price) {
            $scope.event.price = 0
        }

        if (!$scope.event.min_age) {
            $scope.event.min_age = 0
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
            alert('Endereço inválido.')
            return
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
        console.log(files, 'file')
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