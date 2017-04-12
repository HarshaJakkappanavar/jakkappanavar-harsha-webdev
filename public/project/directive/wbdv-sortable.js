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
                    scope.wbdvSortableController.updateCheckpointSort(startPos, endPos);
                }
            });
        }

        return {
            link: linkFunc,
            controller: wbdvSortableController,
            controllerAs: "wbdvSortableController"
        };

        function wbdvSortableController(CheckpointService) {
            var vm = this;
            vm.updateCheckpointSort = updateCheckpointSort;

            function updateCheckpointSort(startPos, endPos) {
                CheckpointService.updateCheckpointSort(startPos, endPos);
            }
        }
    }
})();
