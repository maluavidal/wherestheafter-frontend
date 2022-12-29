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

    $scope.orderMethod = ''
    $scope.orderDirection = true

    const inOrder = (method) => {
        $scope.orderMethod = method
        $scope.orderDirection = !$scope.orderDirection
    }

    $scope.inOrder = inOrder

    profile()

    $scope.logOut = async () => {
        const confirmation = await Swal.fire({
          title: 'Tem certeza que dejesa sair?',
          text: "Você será desconectado de sua conta!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sair',
          cancelButtonText: "Cancelar",
        });
    
        if (!confirmation.isConfirmed) {
          return;
        }
    
        $state.go('loginPage');
      }

    $scope.deleteEvent = deleteEvent;
    
    const goToEdit = (id) => {
        $state.go('editEvent', {
            usersEventId: id
        });
    }

    $scope.goToEdit = goToEdit

    const manageEvent = (id) => {
        $state.go('manageEvent',{
            usersEventId: id
        })
    }
    
    $scope.manageEvent = manageEvent
    
    
    const goToProfile = () => {
        const id = localStorage.getItem('user_id')
        $state.go('userProfile', {
            userId: id
        })
    }

    $scope.goToProfile = goToProfile
}])