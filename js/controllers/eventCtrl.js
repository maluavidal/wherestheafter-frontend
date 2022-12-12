myApp.controller('eventCtrl', ['$scope', '$state', 'EventService', function ($scope, $state, EventService) {

    const id = $state.params.id

    const getEvent = () => {
        EventService.showEvent(id)
            .then(resp => {
                $scope.event = resp.data
                $scope.datetimeStart = moment($scope.event.starts_at).locale('pt-BR').format("D MMM [-] YYYY [•] HH:mm");
                $scope.datetimeEnd = moment($scope.event.ends_at).locale('pt-BR').format("D MMM [-] YYYY [•] HH:mm");
            })
            .catch((e) => {
                console.log(e);
            })
    }

    
    getEvent();


}])