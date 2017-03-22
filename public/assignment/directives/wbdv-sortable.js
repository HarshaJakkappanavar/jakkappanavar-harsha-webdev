/**
 * Created by harsh on 2/21/2017.
 */

(function () {

    angular
        .module("wbdvDirectives", [])
        .directive("wbdvSortable", wbdvSortable);


    function wbdvSortable() {

        function linkFunc(scope, element){
            var startPos = -1;
            var endPos = -1;

            element.sortable({
                axis: "y",
                handle: ".glyphicon-align-justify",
                start: function (event, ui) {
                    startPos = ui.item.index();
                },
                stop: function (event, ui) {
                    endPos = ui.item.index();
                    scope.wbdvSortableController.updateWidgetSort(startPos, endPos);
                }
            });
        }

        return {
            link: linkFunc,
            controller: wbdvSortableController,
            controllerAs: "wbdvSortableController"
        };

        function wbdvSortableController(WidgetService) {
            var vm = this;
            vm.updateWidgetSort = updateWidgetSort;

            function updateWidgetSort(startPos, endPos) {
                WidgetService.updateWidgetSort(startPos, endPos);
            }
        }
    }
})();
