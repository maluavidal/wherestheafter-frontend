myApp.controller('producerCtrl', ['$scope', '$state', 'UserService', 'EventService', function ($scope, $state, UserService, EventService) {
    const profile = () => {
        UserService.profile()
        .then(resp => {
            console.log(resp.data);
                $scope.usersEvents = resp.data.map(usersEvent => {
                    if (!usersEvent.deleted_at) {
                        usersEvent.deleted_at = 'Ativo';
                    } else {
                        usersEvent.deleted_at = 'Encerrado';
                    }

                    if (usersEvent.starts_at){
                        usersEvent.starts_at = moment(usersEvent.starts_at, 'YYYY-MM-DD HH:mm:ss').format("DD/MM/YYYY HH:mm");
                    }
                    
                    console.log(usersEvent);
                    return usersEvent;
                })
            
            })
        .catch((e) => {
            console.log(e)
        })
    }

    const enableEdit = usersEvent => {
        console.log(usersEvent);
        $scope.usersEvents = $scope.usersEvents.map(user => {
            if (user.id === usersEvent.id) {
                user.enable_edit = !user.enable_edit;
            }

            return user;
        });

        usersEvent.check = true;
    }

    const updateEvent = (data) => {
        const eventDataToUpdate = {
            ...data,
            starts_at: moment(data.starts_at, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm')
        };

        console.log(eventDataToUpdate, 'eventDataToUpdate')

        return EventService.updateEvent(data.id, eventDataToUpdate)
        .then(() => {
            $state.go('profile')
        })
        .catch((e) => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'An error ocurred',
                showConfirmButton: false,
                timer: 1500
              })
        })    }

    const deleteEvent = (usersEvent) => {
        return EventService.deleteEvent(usersEvent)
        .then(() => {
            $state.go('profile')
        })
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

    profile()

    $scope.updateEvent = updateEvent;
    $scope.deleteEvent = deleteEvent
    $scope.enableEdit = enableEdit;
}])