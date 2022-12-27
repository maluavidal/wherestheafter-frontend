myApp.controller('editEventCtrl', ['$scope', '$state', 'EventService', function ($scope, $state, EventService) {

    const id = $state.params.usersEventId;

    const getEvent = () => {
        EventService.showEvent(id)
            .then(resp => {
                $scope.event = {
                    ...resp.data,
                    starts_at: new Date(resp.data.starts_at),
                    ends_at: new Date(resp.data.ends_at),
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    getEvent();



    const updateEvent = (data) => {
        // const eventDataToUpdate = {
        //     ...data,
        //     starts_at: new Date(data.starts_at),
        //     ends_at: new Date(data.ends_at),
        // };
        console.log(data);

        return EventService.updateEvent(id, data)
        .catch((e) => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'An error ocurred',
                showConfirmButton: false,
                timer: 1500
              })
        })    
    }

    $scope.updateEvent = updateEvent
}])