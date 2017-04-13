/**
 * Created by harsh on 4/13/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .directive("autoComplete", autoComplete);

    function autoComplete($timeout) {

        function linkFunc(scope, iElement, iAttrs, model) {
            iElement.autocomplete({
                source:model[iAttrs.uiItems],
                select: function () {
                    $timeout(function () {
                        iElement.trigger('input');
                    }, 0);
                }
            });
        }

        return {
            require: 'ngModel',
            link: linkFunc
        };
    }
})();