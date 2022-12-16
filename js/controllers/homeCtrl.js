myApp.controller('homeCtrl', ['$scope', "$state", "EventService", '$location', function ($scope, $state, EventService, $location) {

    const init = () => {
        listAllEvents(),
            listCities()
    };

    const listAllEvents = filter => {
        console.log(filter)
        EventService.listEvents(filter)
            .then(resp => {
                $scope.events = resp.data;
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const refresh = event => {
        $scope.loading = false
        $location.path(`/events/${event.id}`)
    }

    const changeDate = () => {
        const filter = {
            starts_at: moment($scope.startDate).startOf('day').format('YYYY-MM-DD'),
            ends_at: moment($scope.endDate).startOf('day').format('YYYY-MM-DD')
        }
        listAllEvents(filter);
    }

    const filterLocation = location => {
        const filter = {
            city: location
        }

        listAllEvents(filter);
    }

    const listCities = () => {
        EventService.getCities()
            .then(resp => {
                $scope.locations = resp.data;
            })
            .catch((e) => {
                console.log(e)
            })
    }

    init()

    $scope.refresh = refresh;
    $scope.listAllEvents = listAllEvents;
    $scope.changeDate = changeDate;
    $scope.filterLocation = filterLocation;
    $scope.listCities = listCities;

}]);