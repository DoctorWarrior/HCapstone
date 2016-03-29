'use strict';

angular.module('SnSApp', [
    'ui.router',
    'ngResource',
    "ngSanitize",
    "com.2fdevs.videogular"
])




.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
        // route for the home page
        .state('app', {
            url:'/',
            views: {
                'header': {
                    templateUrl : 'views/header.html',
                },
                'content': {
                    templateUrl : 'views/home.html',
                },
                'footer': {
                    templateUrl : 'views/footer.html',
                    }
                }
        })
        
        
        
        // route for the aboutus page
        .state('app.aboutus', {
            url:'aboutus',
            views: {
                'content@': {
                    templateUrl: 'views/aboutus.html'
                }
            }
        })
        
        // route for the signup page
        .state('app.signup', {
            url:'signup',
            views: {
                'content@': {
                    templateUrl: 'views/signup.html',
                }
            }
        })
        

        
        //route for the submit page
        .state('app.submit', {
            url:'submit',
            views: {
                'content@': {
                    templateUrl : 'views/submit.html',
                    controller: 'SubmitController'
                }
            }
        })
        
        //route for the total category page
        .state('app.category', {
            url: 'category',
            views: {
                'content@': {
                    templateUrl : 'views/category.html',
                    controller  : 'CategoryController'
                }
            }
        })
    
        //route for the category_entertainment page
        .state('app.category_entertainment', {
            url: 'category_entertainment',
            views: {
                'content@': {
                    templateUrl : 'views/category_entertainment.html',
                    controller  : 'CategoryController'
                }
            }
        })
        
        //route for the category page
        .state('app.category_education', {
            url: 'category_education',
            views: {
                'content@': {
                    templateUrl : 'views/category_education.html',
                    controller  : 'CategoryController'
                }
            }
        })
        
        //route for the video detials page
        .state('app.videodetails', {
            url: 'category/:id',
            views: {
                'content@': {
                    templateUrl : 'views/videodetail.html',
                    controller  : 'VideoDetailController'
                }
            }
        });
    
        $urlRouterProvider.otherwise('/');
    
})






;