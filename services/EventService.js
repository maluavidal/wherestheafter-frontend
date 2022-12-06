myApp.service("EventService", function($http) {
    this.listEvents = () =>  $http.get(`${baseUrl}events/`);
    this.createEvent = (data) => $http.post(`${baseUrl}events/`, data);
    this.deleteEvent = (id) => $http.delete(`${baseUrl}events/${id}`);
    this.showEvent = (id) => $http.get(`${baseUrl}events/${id}`);
    this.updateEvent = (eventId, data) => $http.put(`${baseUrl}events/${eventId}`, data);
    
    this.showAllThumbs = () => $http.get(`${baseUrl}thumbs/`)
  });