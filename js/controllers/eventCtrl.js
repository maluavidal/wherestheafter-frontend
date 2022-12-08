myApp.controller('eventCtrl', ['$scope', '$state', 'EventService', function ($scope, $state, EventService) {
    $scope.teste = 123456;

    const id = $state.params.id

    const getEvent = () => {
        EventService.showEvent(id)
            .then(resp => {
                $scope.event = resp.data
            })
            .catch((e) => {
                console.log(e);
            })
    }

    getEvent();

}])