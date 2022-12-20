myApp.directive("expirationDate", function () {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, ctrl) {
            const formatDate = function (expirationDate) {
                expirationDate = expirationDate.replace(/\D/g, "");
                if (!expirationDate) {
                    return
                }
                const dateFormat = expirationDate.match(/\d{1,4}/g);

                if (date.length > 3) {
                    return
                }

                return dateFormat;
            }

            element.bind("keyup", function () {
                ctrl.$setViewValue(formatCardNumber(ctrl.$viewValue))
                ctrl.$render()
            })
        }
    }
})