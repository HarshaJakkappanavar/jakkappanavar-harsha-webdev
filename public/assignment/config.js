/**
 * Created by harsh on 2/4/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        /*
        * Path to the views
        * */
        var userViews = 'views/user/template/';
        var websiteViews = 'views/website/template/';
        var pageViews = 'views/page/template/';
        var widgetViews = 'views/widget/template/';

        /*
        * Name of the view
        * */
        var loginView = 'login.view.client.html';
        var registerView = 'register.view.client.html';
        var profileView = 'profile.view.client.html';
        var websiteListView  = 'website-list.view.client.html';
        var websiteNewView = 'website-new.view.client.html';
        var websiteEditView = 'website-edit.view.client.html';
        var pageListView = 'page-list.view.client.html';
        var pageNewView = 'page-new.view.client.html';
        var pageEditView = 'page-edit.view.client.html';
        var widgetListView = 'widget-list.view.client.html';
        var widgetChooserView = 'widget-chooser.view.client.html';
        /*Not sure about this page below for now...*/
        var widgetEditView = 'widget-edit.view.client.html';


        $routeProvider
            .when("/login", {
                templateUrl: userViews + loginView,
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: userViews + loginView,
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("default", {
                templateUrl: userViews + loginView,
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: userViews + registerView,
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: userViews + profileView,
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/website", {
                templateUrl: websiteViews + websiteListView,
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: websiteViews + websiteNewView,
                controller: "WebsiteNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: websiteViews + websiteEditView,
                controller: "WebsiteEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: pageViews + pageListView,
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: pageViews + pageNewView,
                controller: "PageNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: pageViews + pageEditView,
                controller: "PageEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: widgetViews + widgetListView,
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: widgetViews + widgetChooserView,
                controller: "WidgetNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: widgetViews + widgetEditView,
                controller: "WidgetEditController",
                controllerAs: "model"
            })

    }
})();
