/**
 * Created by harsh on 2/21/2017.
 */

(function () {
    angular
        .module("DirectiveApp", [])
        .directive("hello", helloDir)
        .directive("helloWorld", helloWorldDir)
        .directive("colorMeRed", colorMeRedDir)
        .directive("makeMeDraggable", makeMeDraggableDir);

    function helloDir() {

        var config = {
            template: '<h2>Hello From Hello Directive</h2>',
        };

        return config;
    }

    function helloWorldDir() {

        var config = {
            templateUrl: 'helloWorld.html'
        };

        return config;
    }

    function colorMeRedDir() {

        function linkFunc(scope, element){
            console.log(element);
            element.css('color', 'red')
        }
        return {
          link: linkFunc
        };
    }

    function makeMeDraggableDir() {

        function linkFunc(scope, element){
            element.draggable();
        }
        return {
            link: linkFunc
        };
    }
})();
