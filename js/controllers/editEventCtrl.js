myApp.controller('editEventCtrl', ['$scope', '$state', 'EventService', function ($scope, $state, EventService) {

    const id = $state.params.usersEventId;

    $scope.ages = [18, 16]

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
        const eventDataToUpdate = {
            ...data,
            starts_at: new Date(data.starts_at),
            ends_at: new Date(data.ends_at),
        };

        return EventService.updateEvent(id, eventDataToUpdate)
        .then(
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Evento atualizado com sucesso!',
                showConfirmButton: true,
                timer: 3000
              }),

            $state.go('producerPage')
        )
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