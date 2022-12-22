myApp.controller('producerCtrl', ['$scope', '$state', 'UserService', 'EventService', 'AlertMessage', function ($scope, $state, UserService, EventService, AlertMessage) {
    
    const profile = () => {
        UserService.profile()
        .then(resp => {
                $scope.usersEvents = resp.data.map(usersEvent => {
                    if (!usersEvent.deleted_at) {
                        usersEvent.deleted_at = 'Ativo';
                    } else {
                        usersEvent.deleted_at = 'Encerrado';
                    }

                    if (usersEvent.starts_at){
                        usersEvent.starts_at = moment(usersEvent.starts_at, 'YYYY-MM-DD HH:mm:ss').format("DD/MM/YYYY HH:mm");
                    }
                    
                    return usersEvent;
                })
            
            })
        .catch((e) => {
            console.log(e)
        })
    }

    const enableEdit = usersEvent => {
        console.log(usersEvent)
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

        return EventService.updateEvent(data.id, eventDataToUpdate)
        .then(() => {
            data.check = false
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

    const deleteEvent = async (usersEvent) => {
        const confirmation = await Swal.fire({
            title: 'Tem certeza que dejesa excluir esse evento?',
            text: "Os dados desse evento serão apagados!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Excluir',
            cancelButtonText: "Cancelar",
          });

          if (confirmation.isConfirmed) {
            AlertMessage.success("Evento excluido!")
          }
          
          if (!confirmation.isConfirmed) {
            return;
          }

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