myApp.service('PdfService', function ($http) {
    this.generatePdf = (data) => {
        return $http.post(`${baseUrl}pdf/`, data)
    }
})