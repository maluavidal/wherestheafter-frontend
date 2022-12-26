myApp.service("PaymentService", function ($http) {
    this.getPdf = (id) => {
        return $http.post(`${baseUrl}pdf/${id}`)
    }
    this.executePayment = (clientId, eventId, data) => {
        return $http.post(`${baseUrl}payments/${clientId}/${eventId}`, data)
    }
})