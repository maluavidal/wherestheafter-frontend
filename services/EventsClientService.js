myApp.service("EventsClientService", function ($http) {
    this.listEventsClients = () => {
        return $http.get(`${baseUrl}eventsclients/`)
    }
    this.showEventsClient = (id) => {
        return $http.get(`${baseUrl}eventsclients/${id}`)
    }
    this.countSoldTickets = (event_id) => {
        return $http.get(`${baseUrl}eventsclients/clients/${event_id}`)
    }
    this.updateEventsClient = (id) => {
        return $http.put(`${baseUrl}eventsclients/${id}`)
    }
    this.createEventClient = (data) => {
        return $http.post(`${baseUrl}eventsclients/`, data)
    }
    this.deleteEventsClient = (id) => {
        return $http.delete(`${baseurl}eventsclients/${id}`)
    }
    this.dailySoldTickets = (event_id) => {
        return $http.get(`${baseUrl}eventsclients/daily-tickets/${event_id}`)
    }
})