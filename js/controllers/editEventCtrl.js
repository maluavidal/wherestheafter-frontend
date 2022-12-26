myApp.controller('editEventCtrl', ['$scope', '$state', 'EventService', function ($scope, $state, EventService) {

    const id = $state.params.usersEventId;

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

    const updateEvent = (data) => {
        const eventDataToUpdate = {
            ...data,
            starts_at: moment(data.starts_at, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm')
        };

        return EventService.updateEvent(id, eventDataToUpdate)
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