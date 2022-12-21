myApp.directive("cardNumber", function () {
    return {
        require: "ngModel",
        link: function (scope, element, attrs, ctrl) {
            const formatCardNumber = function (cardNumber) {
                cardNumber = cardNumber.replace(/\D/g, "");
                if (!cardNumber) {
                    return
                }
                const cardNumberFormat = cardNumber.match(/\d{1,4}/g).join(' ');

                return cardNumberFormat;
            }

            element.bind("keyup", function () {
                ctrl.$setViewValue(formatCardNumber(ctrl.$viewValue))
                ctrl.$render()
            })
        }
    }
})