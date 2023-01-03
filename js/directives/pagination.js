myApp.directive('pagination', function() {
    return {
      restict: 'E',
      templateUrl: './views/pagination.html',
      scope: {
        totalItems: "=",
        listFn: "=",
        page: "=",
        itemsPerPage: "=",
      },
      
      controller: ["$scope", function ($scope) {
        $scope.totalPages = Math.ceil(~~$scope.totalItems / $scope.itemsPerPage);
        $scope.pages = [];
  
        $scope.list = page => {
          if (page === 0 ) {
            $scope.page = 1;
            $scope.listFn($scope.page)
            return
          } 

          if (page < 1 || page > $scope.totalPages) return

          $scope.page = page;
          
          $scope.listFn(page);
        }
  
        for (let i = 1; i <= $scope.totalPages; i++){
          $scope.pages.push(i);
        }
  
        $scope.checkActive = (page) => {
          if (page === $scope.page) return true;
          return false
        }
      }]
  
    }
  
  });