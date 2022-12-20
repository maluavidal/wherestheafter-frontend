myApp.service("EventsClientService", function ($http) {
    this.getPaymentMethods = () => {
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
})