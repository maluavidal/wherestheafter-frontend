myApp.service("PaymentService", function ($http) {
    this.listPayments = () => {
        return $http.get(`${baseUrl}clients/`)
    }
    this.showPayment = (id) => {
        return $http.get(`${baseUrl}clients/${id}`)
    }
    this.executePayment = (data) => {
        return $http.post(`${baseUrl}clients`, data)
    }
    this.deletePayment = (id) => {
        return $http.delete(`${baseUrl}clients/${id}`)
    }
})