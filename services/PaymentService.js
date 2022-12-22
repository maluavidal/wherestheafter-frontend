myApp.service("PaymentService", function ($http) {
    this.executePayment = (clientId, eventId, data) => {
        return $http.post(`${baseUrl}payments/${clientId}/${eventId}`, data)
    }
})