myApp.controller('homeCtrl', ['$scope', "$state", "EventService", '$location', function ($scope, $state, EventService, $location) {

    const listAllEvents = (filter) => {
        EventService.listEvents(filter)
            .then(resp => {
                $scope.events = resp.data;
                const locations = [];

                $scope.events.forEach(element => {
                    const address = element.address_city

                    if (locations.includes(address)) return

                    locations.push(address);
                });

                $scope.locations = locations;
            })
            .catch((e) => {
                console.log(e);
            })
    }

    listAllEvents()

    const refresh = event => {
        $scope.loading = false
        $location.path(`/events/${event.id}`)
    }

    const locationRefresh = location => {
        $scope.loading = false
        $location.path(`/events/${event.address_city}`)
    }
    
    $scope.startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    $scope.endOfMonth = moment().endOf('month').format('YYYY-MM-DD');

    $scope.refresh = refresh;
    $scope.listAllEvents = listAllEvents;

}]);