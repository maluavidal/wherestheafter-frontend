myApp.service("EventService", function ($http) {
  this.listEvents = () => {
    return $http.get(`${baseUrl}events/`)
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