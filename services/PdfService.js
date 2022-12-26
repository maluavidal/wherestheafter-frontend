myApp.service('PdfService', function ($http) {
    this.generatePdf = (paymentId) => {
        return $http.post(`${baseUrl}pdf/${paymentId}`)
    }
})