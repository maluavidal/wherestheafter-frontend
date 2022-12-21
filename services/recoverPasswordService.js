myApp.service("RecoverPasswordService", function($http) {
    this.recovery = (data) =>  $http.post(`${baseUrl}recover-password/recovery/`, data);
    this.validateToken = (token) =>  $http.get(`${baseUrl}recover-password/validate-token-password/${token}`);
    this.changePassword = (data) =>  $http.put(`${baseUrl}recover-password/change-password/${data.token}`, data);
  })