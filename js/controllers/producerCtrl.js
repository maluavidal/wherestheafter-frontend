myApp.controller('producerCtrl', ['$scope', '$state', 'UserService', 'EventService', 'AlertMessage', function ($scope, $state, UserService, EventService, AlertMessage) {
    $scope.searchText = '';
    $scope.status = null;
    $scope.loading = false;
    $scope.totalItems;

    const init = () => {
        searchProfileEvents(1)
    }

    $scope.statusTypes = [
        {
            name: 'Aberto',
            value: 'ongoing'
        },
        {
            name: 'Encerrado',
            value: 'over'
        }
    ]

    const searchProfileEvents = page => {
        
        $scope.page = page || $scope.page;
        
        const filter = {
            page: $scope.page,
            search_text: $scope.searchText,
            start_date: $scope.startDate,
            end_date: $scope.endDate,
            status: $scope.status
        }
        
        EventService.paginateList(filter)
        .then(resp => {
            if (page === 1) {
                $scope.totalItems = resp.data.totalItems;
            }

            $scope.loading = true;
            
            const now = moment();
            
            $scope.usersEvents = resp.data.events.map(usersEvent => {
                if (moment(usersEvent.ends_at).isBefore(now)) {
                    $scope.active = false
                    usersEvent.status = 'Encerrado'
                } else {
                    $scope.active = true
                    usersEvent.status = 'Aberto'
                }
                return usersEvent
            });
            
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
            $state.reload();
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

    $scope.logOut = async () => {
        const confirmation = await Swal.fire({
            title: 'Tem certeza que dejesa sair?',
            text: "Você será desconectado de sua conta!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '##3085d6',
            confirmButtonText: 'Sair',
            cancelButtonText: "Cancelar",
        });

        if (!confirmation.isConfirmed) {
            return;
        }

        localStorage.clear()

        $state.go('loginPage');
    }

    $scope.deleteEvent = deleteEvent;

    const goToEdit = (id) => {
        $state.go('editEvent', {
            usersEventId: id
        });
    }

    $scope.goToEdit = goToEdit

    const manageEvent = (event) => {
        if (event.status === 'over') {
            return;
        };

        $state.go('manageEvent', {
            usersEventId: event.id
        })
    }

    $scope.manageEvent = manageEvent

    const goToProfile = () => {
        const id = localStorage.getItem('user_id')
        $state.go('userProfile', {
            userId: id
        })
    }

    init();

    $scope.page = 1
    $scope.goToProfile = goToProfile
    $scope.searchProfileEvents = searchProfileEvents
}])