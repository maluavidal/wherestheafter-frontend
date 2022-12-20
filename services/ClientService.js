myApp.service("ClientService", function ($http) {
    this.listClients = () => {
        return $http.get(`${baseUrl}clients/`)
    }
    this.showClient = (id) => {
        return $http.get(`${baseUrl}clients/${id}`)
    }
    this.updateClient = (id) => {
        return $http.put(`${baseUrl}clients/${id}`)
    }
    this.createClient = (data) => {
        return $http.post(`${baseUrl}clients`, data)
    }
    this.deleteClient = (id) => {
        return $http.delete(`${baseUrl}clients/${id}`)
    }
})