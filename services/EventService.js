myApp.service("EventService", function ($http) {
  this.listEvents = filter => {
    return $http.get(`${baseUrl}events/`, { params: filter })
  }
  this.getCities = () => {
    return $http.get(`${baseUrl}events/cities`)
  }
  this.createEvent = (data) => {

    return $http({
        method: 'post', 
        url: `${baseUrl}events/`, 
        data: data,
        headers: { 'Content-Type': undefined },
        transformRequest: function (data, headersGetter) {
          var formData = new FormData();
          angular.forEach(data, function (value, key) {
              formData.append(key, value);
          });
          return formData;
      }
    })
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
  this.getAddress = (data) => {
    return $http.get(`${baseUrl}events/cep`, {params: {cep: data}});
  }
  
});