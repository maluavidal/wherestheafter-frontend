myApp.controller('manageEventCtrl', ['$scope', '$state', 'EventService', 'EventsClientService', function ($scope, $state, EventService, EventsClientService) {

    const id = $state.params.usersEventId

    const dailySoldTickets = () => {
        EventsClientService.dailySoldTickets(id)
            .then(resp => {
                $scope.ticketsSold = resp.data;

                $scope.groupedTicketsByDay = $scope.ticketsSold.reduce((acc, ticket) => {
                    const date = moment(ticket.created_at).format('DD/MM/YYYY')

                    if (!acc[date]) {
                        acc[date] = 0;
                    }

                    acc[date] += 1;

                    return acc;
                }, {});

                $(document).ready(function () {
                    const title = {
                        text: 'Quantidade de ingressos vendidos por dia'
                    };
                    const xAxis = {
                        categories: Object.keys($scope.groupedTicketsByDay)
                    };
                    const yAxis = {
                        title: {
                            text: 'Quantidade ingressos'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    };
                    const legend = {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    };
                    const series = [{
                        type: 'spline',
                        name: 'Vendas',
                        data: Object.values($scope.groupedTicketsByDay)
                    },
                    ];

                    const json = {};
                    json.title = title;
                    json.xAxis = xAxis;
                    json.yAxis = yAxis;
                    json.legend = legend;
                    json.series = series;

                    $('#line-container').highcharts(json);
                });
                console.log($scope.groupedTicketsByDay, 'groupedTicketsByDay')
            })
    }

    dailySoldTickets()

    // $scope.ticketsSold = [{
    //     id: 1,
    //     created_at: '2022-12-20'
    // }, {
    //     id: 2,
    //     created_at: '2022-12-22'
    // }, {
    //     id: 2,
    //     created_at: '2022-12-22'
    // }, {
    //     id: 2,
    //     created_at: '2022-12-22'
    // }, {
    //     id: 3,
    //     created_at: '2022-12-23'
    // }, {
    //     id: 4,
    //     created_at: '2022-12-24'
    // }, {
    //     id: 4,
    //     created_at: '2022-12-24'
    // }, {
    //     id: 5,
    //     created_at: '2022-12-25'
    // }, {
    //     id: 5,
    //     created_at: '2022-12-25'
    // }, {
    //     id: 5,
    //     created_at: '2022-12-25'
    // }, {
    //     id: 6,
    //     created_at: '2022-12-26'
    // }, {
    //     id: 6,
    //     created_at: '2022-12-26'
    // }, {
    //     id: 6,
    //     created_at: '2022-12-26'
    // }];




    const countTickets = () => {
        EventsClientService.countSoldTickets(id)
            .then(resp => {
                $scope.soldTickets = resp.data
                EventService.showEvent(id)
                    .then(resp => {
                        $scope.totalTickets = resp.data

                        console.log($scope.totalTickets.tickets_amount);

                        $(document).ready(function () {
                            const chart = {
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false
                            };
                            const title = {
                                text: 'Quantidade de ingressos vendidos'
                            };
                            const tooltip = {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                            };
                            const plotOptions = {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                }
                            };
                            const series = [{
                                type: 'pie',
                                name: 'ingressos',
                                data: [
                                    ['Ingressos vendidos', $scope.soldTickets],
                                    ['Ingressos disponíveis', $scope.totalTickets.tickets_amount]
                                ]
                            }];
                            const json = {};
                            json.chart = chart;
                            json.title = title;
                            json.tooltip = tooltip;
                            json.series = series;
                            json.plotOptions = plotOptions;
                            $('#pie-container').highcharts(json);
                        });



                    })


            })
            .catch((e) => {
                console.log(e);
            })
    }

    countTickets()

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


}])