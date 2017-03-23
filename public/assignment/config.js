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

        $routeProvider
            .when("/login", {
                templateUrl: userViews + 'login.view.client.html',
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: userViews + 'login.view.client.html',
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("default", {
                templateUrl: userViews + 'login.view.client.html',
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: userViews + 'register.view.client.html',
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: userViews + 'profile.view.client.html',
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/website", {
                templateUrl: websiteViews + 'website-list.view.client.html',
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: websiteViews + 'website-new.view.client.html',
                controller: "WebsiteNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: websiteViews + 'website-edit.view.client.html',
                controller: "WebsiteEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: pageViews + 'page-list.view.client.html',
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: pageViews + 'page-new.view.client.html',
                controller: "PageNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: pageViews + 'page-edit.view.client.html',
                controller: "PageEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: widgetViews + 'widget-list.view.client.html',
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: widgetViews + 'widget-chooser.view.client.html',
                controller: "WidgetNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: widgetViews + 'widget-edit.view.client.html',
                controller: "WidgetEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new/:wgid", {
                templateUrl: widgetViews + 'widget-edit.view.client.html',
                controller: "WidgetEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new/:wgid/flickr", {
                templateUrl: widgetViews + 'widget-flickr-search.view.client.html',
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            })

    }
})();
