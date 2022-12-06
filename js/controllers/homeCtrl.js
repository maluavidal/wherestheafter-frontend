myApp.controller("homeCtrl", ['$scope', "$state", "EventService", '$location', function($scope, $state, EventService, $location) {
    $scope.teste = 123456789
    console.log($scope.teste);

    const listAllEvents = () => {
        console.log($scope.searchEvents, 'searchEvents')
        EventService.listEvents()
        .then(resp => {
            $scope.events = resp.data;
        })
        .catch((e) => {
            console.log(e);
        })
       } 

       listAllEvents()

       const refresh = event => {
        $scope.loading = false
        $location.path(`/profile/${event.id}`)
    }

    $scope.refresh = refresh;
    $scope.listAllEvents = listAllEvents;
    
}]);