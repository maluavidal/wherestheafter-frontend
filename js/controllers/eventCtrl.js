myApp.controller('eventCtrl', ['$scope', '$state', 'EventService', function ($scope, $state, EventService) {

    const getEvent = () => {
        EventService.showEvent()
        .then(resp => {
            $scope.event = resp.data
            console.log(resp.data)
        })
        .catch((e) => {
            console.log(e);
        })
    }

    $scope.event = getEvent
}])