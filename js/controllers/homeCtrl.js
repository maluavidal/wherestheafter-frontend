myApp.controller('homeCtrl', ['$scope', "$state", "EventService", '$location', function ($scope, $state, EventService, $location) {

    const listAllEvents = filter => {
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

    const refresh = event => {
        $scope.loading = false
        $location.path(`/events/${event.id}`)
    }
    
    const changeDate = () => {
        const filter ={
            start_date: moment($scope.startDate).startOf('hour').format('YYYY-MM-DD'),
            end_date: moment($scope.endDate).startOf('hour').format('YYYY-MM-DD')
        }
    
        listAllEvents(filter);
    }
    
    changeDate();

    $scope.startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    $scope.endOfMonth = moment().endOf('month').format('YYYY-MM-DD');

    $scope.refresh = refresh;
    $scope.listAllEvents = listAllEvents;
    $scope.changeDate = changeDate;

}]);