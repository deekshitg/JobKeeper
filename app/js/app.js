var myApp = angular.module('myApp',['ngRoute','firebase']);

myApp.run(['$rootScope','$location',function($rootScope,$location){
  $rootScope.$on('$routeChangeError',function(event,next,previous,error){
    if(error == 'AUTH_REQUIRED'){
      $rootScope.message='Sorry You Must Be Logged In To Continue';
      $location.path('/login');
    }
  });
}]);

myApp.config(['$routeProvider',function($routeProvider){
  $routeProvider.
      when('/login',{
        templateUrl:'views/login.html',
        controller:'RegisterController'
      }).
      when('/register',{
        templateUrl:'views/registration.html',
        controller:'RegisterController'
      }).
      when('/home',{
        templateUrl:'views/home.html',
        controller:'InterviewController',
        resolve:{
          currentAuth: function(Authentication){
            return Authentication.requireAuth();
          }
        }
      }).
      when('/addInterview',{
        templateUrl:'views/addInterview.html',
        controller:'InterviewController',
        resolve:{
          currentAuth: function(Authentication){
            return Authentication.requireAuth();
          }
        }
      }).
      when('/company',{
        templateUrl:'views/company.html',
        controller:'CompanyController',
        resolve:{
          currentAuth: function(Authentication){
            return Authentication.requireAuth();
          }
        }
      }).
      when('/viewcompany',{
        templateUrl:'views/viewcompany.html',
        controller:'CompanyController',
        resolve:{
          currentAuth: function(Authentication){
            return Authentication.requireAuth();
          }
        }
      }).
      otherwise({
        redirectTo:'/login'
      });

}]);
