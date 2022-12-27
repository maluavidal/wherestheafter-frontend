myApp.controller('manageEventCtrl', ['$scope', '$state', 'EventService', 'EventsClientService', function($scope, $state, EventService, EventsClientService) {

    const id = $state.params.usersEventId
    
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