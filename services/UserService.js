myApp.service("UserService", function ($http) {
    this.listUsers = () => { 
        return $http.get(`${baseUrl}users/`);
    }
    this.createUser = (data) => {
      return $http.post(`${baseUrl}users/`, data)
    }
    this.deleteUser = (id) => {
      return $http.delete(`${baseUrl}users/${id}`)
    }
  
    this.showUser = (id) => {
      return $http.get(`${baseUrl}users/${id}`)
    }
  
    this.updateUser = (UserId, data) => {
       return $http.put(`${baseUrl}users/${UserId}`, data);
    }
  });