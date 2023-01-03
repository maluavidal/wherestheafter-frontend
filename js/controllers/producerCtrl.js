myApp.controller('producerCtrl', ['$scope', '$state', 'UserService', 'EventService', 'AlertMessage', function ($scope, $state, UserService, EventService, AlertMessage) {

    const init = () => {
        profile(1)
    }

    $scope.loading = false

    // const listAllEvents = filter => {
    //     EventService.listEvents(filter).then(resp => {
    //         $scope.events = resp.data;
    //     }).catch((e) => {
    //         console.log(e);
    //     })
    // }

    const profile = (page) => {
        EventService.paginateList(page)
            .then(resp => {
                $scope.items = resp.data.totalItems
                $scope.usersEvents = resp.data.events.map(usersEvent => {
                    if (usersEvent.starts_at) {
                        usersEvent.starts_at = moment(usersEvent.starts_at, 'YYYY-MM-DD HH:mm:ss').format("DD/MM/YYYY HH:mm");
                    }
                    return usersEvent
                })
                $scope.loading = true;
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const showInput = () => {
        $scope.searching = true

    }

    $scope.showInput = showInput

    const filtering = filter => {
        UserService.profile(filter)
            .then(resp => {
                $scope.eventsToFilter = resp.data
                console.log(resp.data);
            }).catch((e) => {
                console.log(e);
            })
    }

    const searchName = () => {
        $scope.searchingName = true

        const filter = {
            name: $scope.searchEvents
        }
        filtering(filter);
    }

    const searchLocation = () => {
        const filter = {
            city: $scope.searchLocations
        }

        // if (!filter) {
        //     $scope.notFound = true;

        filtering(filter);
    }

    const listCities = () => {
        EventService.getCities()
            .then(resp => {
                $scope.locations = resp.data;
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const changeDate = () => {
        const filter = {
            starts_at: moment($scope.startDate).startOf('day').format('YYYY-MM-DD'),
            ends_at: moment($scope.endDate).startOf('day').format('YYYY-MM-DD')
        }
        filtering(filter);
    }

    filtering()

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
        if (event.deleted_at === 'Encerrado') {
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

    $scope.page = 1
    $scope.goToProfile = goToProfile
    $scope.profile = profile
    $scope.filtering = filtering
    $scope.searchLocation = searchLocation
    $scope.searchName = searchName
    $scope.changeDate = changeDate
    $scope.listCities = listCities

    init()

}])