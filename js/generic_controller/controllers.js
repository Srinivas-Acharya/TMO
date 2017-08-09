var app=angular.module('loginApp',['ngRoute']);

app.config(function($routeProvider,$httpProvider){
	$httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
	$routeProvider
		.when('/index.html',{
			templateUrl:"index.html"
		})
		.when('/page-login.html?',{
			templateUrl:"page-login.html?"
		})
		.otherwise({
			redirectTo:'/'
		});
	});

app.controller('loginCtrl',function($rootScope,$scope,$location,$http,$window){
	$scope.submit=function(){
		var uname=$scope.username;
		var upassword=$scope.password;
		
		var request = $http({
                    method: "post",
                    url: "http://localhost:8084/TaulavaMadhwaOkkoota/j_spring_security_check?j_username="+uname+"&j_password="+upassword,
                    data: {
                        "j_username":uname,
				"j_password":upassword
                    }
                }).success(function (data, status, headers, config) {
					alert(status+""+headers('SessionId'));
					if(headers('SessionId')!=null){
						 $scope.error ="";
						  $rootScope.authenticated ={ value: true };
						 $window.location.href="/TaulavaMadhwaOkkoota/index.html";
					}else {
                    $scope.error = "Please enter valid credential";
                }
			});
	};
})