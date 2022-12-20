myApp.service("ThumbService", function ($http) {
    this.getThumbs = () => {
        return $http.get(`${baseUrl}thumbs/`)
    }
    this.deleteThumb = (id) => {
        return $http.get(`${baseUrl}thumbs/${id}`)
    }
})