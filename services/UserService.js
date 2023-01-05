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
  
    this.showUser = () => {
      return $http.get(`${baseUrl}users/user-profile`)
    }
  
    this.updateUser = (data) => {
       return $http.put(`${baseUrl}users/`, data);
    }
    this.profile = (filter) => {
      return $http.get(`${baseUrl}users/profile`, { params: filter });
    }
  });