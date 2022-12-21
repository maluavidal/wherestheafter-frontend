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

    $scope.backgroundImage = {};

    const createEvent = () => {
        EventService.createEvent($scope.event)
        .then(() => {
            $state.go('producerPage')
        })
        .catch((e) => {
            console.log(e)
        })
    }


    const onSelectFile = ($file) => {
        console.log($files);
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
        if (!files || !files.length) {
            return;
        }

        const file = files[0];

        file.thumbUrl = await getImageThumbUrl(file);

        console.log(file.thumbUrl, 'file.thumbUrl');

        $timeout(() => {
            $scope.event.file = file;
            console.log($scope.event.file, '$scope.backgroundImage')
        })



        // $scope.$digest();
    };

    $scope.createEvent = createEvent
    $scope.uploadFile = uploadFile;
    $scope.getAddressByCep = getAddressByCep;
    $scope.onSelectFile = onSelectFile;
}])