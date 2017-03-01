/**
 * Created by harsh on 2/21/2017.
 */

(function () {

    angular
        .module("wbdvDirectives", [])
        .directive("wbdvSortable", wbdvSortable);


    function wbdvSortable() {

        function linkFunc(scope, element){

            element.sortable({
                axis: "y",
                handle: ".glyphicon-align-justify"
            });
        }

        return {
            link: linkFunc
        };
    }
})();
