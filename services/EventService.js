myApp.service("EventService", function ($http) {
  this.listEvents = (filter) => { 
    if (filter.id) {
      return $http.get(`${baseUrl}events/?city=${filter}`)
    } else {
      return $http.get(`${baseUrl}events?start_at=${filter.start_date}&end_date=${filter.end_date}`)
    }
  }
  this.createEvent = (data) => {
    return $http.post(`${baseUrl}events/`, data)
  }
  this.deleteEvent = (id) => {
    return $http.delete(`${baseUrl}events/${id}`)
  }

  this.showEvent = (id) => {
    return $http.get(`${baseUrl}events/${id}`)
  }

  this.updateEvent = (eventId, data) => {
     return $http.put(`${baseUrl}events/${eventId}`, data);
  }
});