myApp.service("recoverPasswordService", function($http) {
    this.recovery = (data) =>  $http.post(`${baseUrl}recovery_password/`, data);
    this.validateToken = (token) =>  $http.get(`${baseUrl}validate-token-password/${token}`);
    this.changePassword = (data) =>  $http.put(`${baseUrl}change-password/${data.token}`, data);
  })