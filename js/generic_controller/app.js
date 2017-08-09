var app=angular.module('tmoApp',['ngRoute','googleplus','ui.bootstrap','infinite-scroll','pascalprecht.translate',"ngSanitize","com.2fdevs.videogular","com.2fdevs.videogular.plugins.controls","com.2fdevs.videogular.plugins.overlayplay","com.2fdevs.videogular.plugins.poster",         "com.2fdevs.videogular.plugins.buffering","ngFileUpload","angularProgressbar",
  "info.vietnamcode.nampnq.videogular.plugins.youtube"]);

app.factory('datasource', ['$log', '$timeout',
		function (console, $timeout) {

			var get = function (index, count, success) {
				$timeout(function () {
					var result = [];
					for (var i = index; i <= index + count - 1; i++) {
						result.push("item #" + i);
					}
					success(result);
				}, 100);
			};

			return {
				get: get
			};
		}
	]);


app.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('en', translationsEN);
  $translateProvider.translations('ka', translationsKA);
    $translateProvider.preferredLanguage('en');
  $translateProvider.fallbackLanguage('en');
}]);

	

app.run([
    '$route', '$templateCache', '$window','$http', '$rootScope',(function ($route, $templateCache, $window,$http,$rootScope) {
        var url;
        for (var i in $route.routes) {
            if ($route.routes[i].preload) {
                if (url = $route.routes[i].templateUrl) {
                    $http.get(url, { cache: $templateCache });
                }
            }
        }
	$window.fbAsyncInit = function() {
     FB.init({
      appId: '192354547802460',
      cookie: true,
      cookie: true,
      xfbml: true,
	  version    : 'v2.0'
    });
    //sAuth.watchAuthenticationStatusChange();
  };
   
  (function(d,s,id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);

  }(document,'script', 'facebook-jssdk'));
    })

]);

app.directive("passwordVerify", function() {
   return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;

            if (scope.passwordVerify || ctrl.$viewValue) {
               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordVerify", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
});

 app.config(['GooglePlusProvider', function(GooglePlusProvider) {
	 GooglePlusProvider.setScopes('profile email');
         GooglePlusProvider.init({
           clientId: '403545000174-bhm0490hcn45miucqch651gr0fqorq8l.apps.googleusercontent.com',
           apiKey: '403545000174-bhm0490hcn45miucqch651gr0fqorq8l'
         });
    }]);

app.config(function($routeProvider,$httpProvider,$compileProvider){
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
   $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

	$httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
	$routeProvider
		.when('/home',{
			controller: "homeCntrl",
			templateUrl:"home.html"
		})
		.when('/page-login',{
			controller: "loginCtrl",
			templateUrl:"page-login.html"	
		})
		.when('/Ratha-Yathre',{
			controller: "rathaYathreCntrl",
			templateUrl:"Taulava-Madhwa-Ratha-Yathre.html"	
		}).when('/about',{
			controller: "aboutCntrl",
			templateUrl:"page-about-us.html"	
		}).when('/contact',{
			controller: "contactCntrl",
			templateUrl:"page-contact-us.html"	
		}).when('/register',{
			controller: "registerCntrl",
			templateUrl:"page-register.html"	
		}).when('/memberregister',{
			controller: "memberRegisterCntrl",
			templateUrl:"page-register-member.html"	
		}).when('/spirutualactivity',{
			controller: "spirutualActivityCntrl",
			templateUrl:"spirutualactivity.html"	
		}).when('/socialactivity',{
			controller: "socialActivityCntrl",
			templateUrl:"socio-cultural-activity.html"	
		}).when('/imageGallery',{
			controller: "imageGalleryCntrl",
			templateUrl:"imageGallery.html"	
		}).when('/audioGallery',{
			controller: "audioGalleryCntrl",
			templateUrl:"audioGallery.html"	
		}).when('/discssionAndForm',{
			controller: "discussionAndFormCntrl",
			templateUrl:"discussionAndForm.html"	
		})
		.when('/eventSubmit',{
			controller: "eventSubmitCntrl",
			templateUrl:"eventSubmit.html"	
		}).when('/videoGallery',{
			controller: "videoGalleryCntrl",
			templateUrl:"videoGallery.html"	
		}).when('/termPolicy',{
			controller: "termPolicyCntrl",
			templateUrl:"page-terms-privacy.html"	
		}).when('/event',{
			controller: "eventCntrl",
			templateUrl:"events.html"	
		}).when('/download',{
			controller: "downloadGalleryCntrl",
			templateUrl:"downloadGallery.html"	
		}).when('/vidyanidhi',{
			controller: "vidyaNidhiCntrl",
			templateUrl:"vidya-nidhi.html"	
		}).when('/passwordreset',{
			controller: "passwordResetCntrl",
			templateUrl:"password-reset.html"	
		})
		.when('/yakshagana',{
			controller: "yakshaganaCntrl",
			templateUrl:"Yakshagana.html"	
		}).when('/himmela',{
			controller: "himmelaCntrl",
			templateUrl:"Himmela.html"	
		})
		.when('/docUpload',{
			controller: "documentUploadCntrl",
			templateUrl:"uploadDocument.html"	
		})
		.when('/purohithya',{
			controller: "purohithyaCntrl",
			templateUrl:"Purohithya.html"	
		})
		.when('/matrimony',{
			controller: "matrimonyCntrl",
			templateUrl:"Matrimony.html"	
		})
		.otherwise({
			redirectTo:'/home'
		});
	});
	

	
app.config(['$compileProvider', function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
 $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
}]).controller('homeCntrl',function($rootScope,$routeParams,$scope,$location,$http,$translate,$window){	
	$('.homepage-slider').show();
	$('.imageSection').hide();
	
	$http({method:"GET", 
			url:propertyHostConfig.hostUrl+"/article/getVideo?name=-1"}).then(function(result){

            $scope.videoNameList=result.data;
        });
	
	
$scope.imageGallery=0;
	 $translate.use($("#language option:selected").attr("id"));
	   $scope.selectedLanguage = $translate.proposedLanguage();
	 $scope.changeLanguage = function () {
      //use parameter needs to be part of a known locale Eg: en-UK, en, etc
      $translate.use($scope.selectedLanguage);
    };
	
	$scope.isLogin=Boolean($routeParams.isLogin);
	var nname= $routeParams.name;
	var type= $routeParams.register;
	if($routeParams.isLogin==='true'){
		document.getElementById('loginInDiv').style.visibility  = 'hidden';
		document.getElementById('logoutDiv').style.visibility  = 'visible';
		document.getElementById("welcomeDiv").innerHTML = "Welcome "+nname;
		console.log("nname--"+nname);
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		var e1 = nname+"";
		var e2 = "taulavamadhwa@gmail.com";
		  var isMatch = e1 === e2;
		  	console.log("nname==e2--"+nname==e2);
			console.log("isMatch--"+isMatch);
		if(isMatch)
			document.getElementById('adminPer').style.visibility  = 'visible';
		else
		document.getElementById('adminPer').style.visibility  = 'hidden';
		
		console.log("nname--"+$scope.adminPer);
		if(type=='normal'){
			 $('#myModal').modal('show');
		}else if(type=='member'){
			 $('#myModal').modal('show');
		}
	}else{
		document.getElementById('logoutDiv').style.visibility  = 'hidden';
		document.getElementById('loginInDiv').style.visibility  = 'visible';
		document.getElementById('adminPer').style.visibility  = 'hidden';
		if(type=='normal'){
			 $('#myModal').modal('show');
		}else if(type=='member'){
			 $('#myModal').modal('show');
		}
	}
	

		 $scope.infiniteList = [];
		$scope.incr = 1;

		$scope.scrollTriggered = "";



    $scope.loadMore = function(){
var last = $scope.infiniteList[$scope.infiniteList.length - 1]; 
console.log( $scope.infiniteList.length);
	$http.get(propertyHostConfig.hostUrl+'/article/getImage?name='+$scope.infiniteList.length)
        .success(function (data) {
		//$('#gallery_child').empty();
            for(var i = 0; i< data.length; i++){
				console.log( data[i]);
				$scope.incr +=1;
				//if ($scope.infiniteList.map(function(e) { return e.name; }).indexOf(data[i])==-1)
				if($scope.infiniteList.indexOfObject("name", data[i].name)==-1)
				$scope.infiniteList.push(data[i]);

	if(document.getElementById(data[i].name)==null){
				var createDiv = document.createElement('div');
					createDiv.setAttribute("id",data[i].name);
					createDiv.setAttribute('class', "col-xs-6 col-md-2 my-parent-element");
					createDiv.setAttribute('style', "height: 300px;width: 300px;");

				 var createA = document.createElement('a');
				 var fileName=$scope.infiniteList[i].name+".jpg"
					createA.setAttribute('href', "/AngularTaulavaMadhwaOkkoota/demo-files/"+fileName);
					createA.setAttribute('type', "media_type");
					createA.setAttribute('data-mediabox', "gallery-"+i);
				var createImg = document.createElement('img');
					createImg.setAttribute('class', "imgClass");
					createImg.setAttribute('width', "100%");
					//createImg.setAttribute('height', "100%");
					createImg.setAttribute('src', "/AngularTaulavaMadhwaOkkoota/demo-files/"+fileName);
					document.getElementById("gallery_child").appendChild(createDiv);
					createDiv.appendChild(createA);
					createA.appendChild(createImg);
							}
}
						});
			  };

	$scope.loadMore();


});

app.controller('imageGalleryCntrl',function($rootScope,$scope,$route,$location,$http,$window, Reddit){	
	$('.homepage-slider').hide();
	$('.imageSection').show();

$scope.loadMore();
	
});


app.controller('purohithyaCntrl',function($rootScope,$scope,$route,$location,$http,$window){
$window.scrollTo(0, 0);	
	$('.homepage-slider').hide();
	$('.imageSection').hide();
	
	$scope.register = function() {
		window.alert("Thank you for your interest !!! \n We look forward to the pleasure of your company!!!!. Please contact admin to join whats-group for daily update");
  }
});

app.controller('matrimonyCntrl',function($rootScope,$scope,$route,$location,$http,$window){	
	$window.scrollTo(0, 0);
	$('.homepage-slider').hide();
	$('.imageSection').hide();
	$scope.register = function() {
		window.alert("Thank you for your interest !!! \n We look forward to the pleasure of your company!!!!. Please contact admin to join whats-group for daily update");
  }
});

Array.prototype.indexOfObject = function arrayObjectIndexOf(property, value) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i][property] === value) return i;
    }
console.log(this);
console.log("---"+value);
    return -1;
}


app.config(["$compileProvider" ,function($compileProvider) {

    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(blob:|data:image)/);

}]).controller('documentUploadCntrl',function($rootScope,$scope,$route,$location,$http,$window,Upload, $pbService,){
	$window.scrollTo(0, 0);
	$('.homepage-slider').hide();
	$('.imageSection').hide();	
	$scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file]; 
        }
    });
    $scope.log = '';
	$scope.options = {
		color: '#FCB03C',
		duration: 3000,
		easing: 'easeInOut'
	};
	
	
	$scope.saveVideoLink = function() {
		alert("JJJJ"+$scope.url)
		var vName=$scope.name,vLink=encodeURIComponent($scope.url),
		 url= propertyHostConfig.hostUrl+'/article/saveVideoLink?videoName='+vName+'&videoLink='+vLink+'';
		
		var request = new XMLHttpRequest();
		request.open("POST", url);
		request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		request.send();
		
		
			request.addEventListener("readystatechange", function () {
						  if (this.readyState === 4) {
							  var resp=this.responseText;
							if(resp==="duplicate"||resp==="successfully"){
								alert("Thank You for your contribution")
							}else{
									$window.location.href = 'index.html#/page-login';
									$scope.error="Authentication failed. Please contact Admin";
									$scope.IsSuccess = false;
									 $scope.$apply();
								}
						  }
						});
		
	}
	    $scope.upload = function (files) {
			var fileNames="";
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i],ttt;
			  	var fileName=(file.name).split(".")[0];
				fileNames=fileNames+fileName+",";
				var tb = document.getElementById("tb"),
				progress = document.getElementById("progress");
              if (!file.$error) {
                Upload.upload({
					 headers: {'Content-Type': undefined},
                    url: propertyHostConfig.hostUrl+'/article/saveDocumentInfo?name='+fileName,
                    data: {
                      username: $scope.username,
                      file: file  
                    }
                }).then(function (resp) {
					console.log(resp);
					//tb.style.display = 'none';
                    if(resp.status==200){
						tb.innerHTML = "Thank You!!! "+fileNames+" files are Uploaded sucessfully";
						document.getElementById("progressBar").style.display= 'none';
					}
                }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                    		evt.loaded / evt.total);
					
				  if(progressPercentage>=100) progressPercentage = 100;//keep it under 100%
				 tb.innerHTML = "It is uploading..,"+progressPercentage+"% completed. Please wait...,";// set the value of the text field     
				  progress.style.width = progressPercentage + "%";// set the width of the progress bar		
					tb.style.display = 'block';
					document.getElementById("progressBar").style.display= 'block';
                    $scope.log = 'progress: ' + progressPercentage +                     	'% ' + evt.config.data.file.name + '\n' +  $scope.log;
                });
              }
            }
			console.log(ttt);
        }
    };
	
	
});

app.controller('yakshaganaCntrl',function($rootScope,$scope,$route,$location,$http,$window){	
	$window.scrollTo(0, 0);
	$('.homepage-slider').hide();
	$('.imageSection').hide();
});

app.controller('himmelaCntrl',function($rootScope,$scope,$route,$location,$http,$window){	
	$window.scrollTo(0, 0);
	$('.homepage-slider').hide();
	$('.imageSection').hide();
});

app.controller('audioGalleryCntrl',function($rootScope,$scope,$route,$location,$http,$window){	
	$window.scrollTo(0, 0);
	$('.homepage-slider').hide();
	$('.imageSection').hide();
	
	 $(function() {
            // Setup the player to autoplay the next track
            var a = audiojs.createAll({
                trackEnded: function() {
                    var next = $('ol li.playing').next();
                    if (!next.length) next = $('ol li').first();
                    next.addClass('playing').siblings().removeClass('playing');
                    audio.load($('a', next).attr('data-src'));
                    audio.play();
                }
            });

            // Load in the first track
            var audio = a[0];
            first = $('ol a').attr('data-src');
            $('ol li').first().addClass('playing');
            audio.load(first);

            // Load in a track on click
            $('ol li').click(function(e) {
                e.preventDefault();
                $(this).addClass('playing').siblings().removeClass('playing');
                audio.load($('a', this).attr('data-src'));
                audio.play();
            });
            // Keyboard shortcuts
            $(document).keydown(function(e) {
                var unicode = e.charCode ? e.charCode : e.keyCode;
                // right arrow
                if (unicode == 39) {
                    var next = $('li.playing').next();
                    if (!next.length) next = $('ol li').first();
                    next.click();
                    // back arrow
                } else if (unicode == 37) {
                    var prev = $('li.playing').prev();
                    if (!prev.length) prev = $('ol li').last();
                    prev.click();
                    // spacebar
                } else if (unicode == 32) {
                    audio.playPause();
                }
            })
        });
});

app.controller('eventCntrl',function($rootScope,$scope,$location,$http,$window){	
	$window.scrollTo(0, 0);
$('.homepage-slider').hide();
$('.imageSection').hide();
$scope.range = function(max, step) {
        step = step || 1;
        var input = [];
        for (var i = 0; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
		$http.get(propertyHostConfig.hostUrl+'/article/getAllNews')
        .success(function (data) {
			console.log(JSON.stringify(data));
		$scope.eventList=data;
		});
});




app.controller('termPolicyCntrl',function($rootScope,$scope,$location,$http,$window){	
	$window.scrollTo(0, 0);
$('.homepage-slider').hide();
$('.imageSection').hide();
	
});


app.controller('eventSubmitCntrl',function($rootScope,$scope,$location,$http,$window,Upload){	
	$window.scrollTo(0, 0);
$('.homepage-slider').hide();
$('.imageSection').hide();

var file;

	$scope.uploadFile = function(element) {   
		file= $(element)[0].files[0];
	}
	
	$scope.eventSubmit = function(files) {
		var eventName=$scope.myForm.eventName.$modelValue,eventDesc=$scope.myForm.eventDesc.$modelValue,
		eventDate=$scope.myForm.eventDate.$modelValue,eventIcon=$scope.eventIcon;
		
			var fileName=(file.name);
			var data = new FormData();

		console.log();
			data.append('file', file);	
		var uploadUrl= propertyHostConfig.hostUrl+'/article/saveNewsEvents?eventName='+eventName+'&eventDesc='+eventDesc+'&eventDate='+eventDate.toLocaleDateString("en-US");
		
				var xhr = new XMLHttpRequest();
				xhr.open('POST', uploadUrl, true);
				xhr.send(data);
				
	xhr.onreadystatechange = function() {
		  if (xhr.readyState === 4) {
			  if (xhr.responseText === 'true') {
				alert("Thank You!!!!");
				 location.reload();
			  } else {
				 console.log('failed');
			  }
		  }
		}		
	}
	
	
	
		$scope.articleSubmit = function(files) {
		var articleName=$scope.myForm.articleName.$modelValue,
			articleDesc=$scope.myForm.articleDesc.$modelValue,
			articleType=$('#articleType option:selected').val();
		
			var fileName=(file.name);
			var data = new FormData();

		console.log(uploadUrl);
			data.append('file', file);	
		var uploadUrl= propertyHostConfig.hostUrl+'/article/saveArticle?articleName='+articleName+'&articleDesc='+articleDesc+'&articleType='+articleType;
		
				var xhr = new XMLHttpRequest();
				xhr.open('POST', uploadUrl, true);
				xhr.send(data);
				
	xhr.onreadystatechange = function() {
		  if (xhr.readyState === 4) {
			  if (xhr.responseText === 'true') {
				alert("Thank You!!!!");
				 location.reload();
			  } else {
				 console.log('failed');
			  }
		  }
		}
				
				
	}
});

app.controller('registerCntrl',function($rootScope,$scope,$location,$http,$window,GooglePlus){	
	$window.scrollTo(0, 0);
$('.homepage-slider').hide();
$('.imageSection').hide();

$scope.submit = function() {
		var data = null,userName=$scope.username;
		var xhr = new XMLHttpRequest();
		var user_pass = "firstName="+userName+"&lastName="+userName+"&email="+$scope.email+"&password="+$scope.password+"&passwordVerification="+$scope.password;
		xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function () {
		  if (this.readyState === 4) {
			console.log(this.responseText);
			if(this.responseText=='success'){
				$window.location.href = 'index.html#/home?name='+userName+'&isLogin=true&register=member';
				$scope.IsSuccess = true;
				 $scope.$apply();
			}else{
				$window.location.href = 'index.html#/page-login';
				$scope.error="Username or password is incorrect.";
				$scope.IsSuccess = false;
				 $scope.$apply();
			}
		  }
		});
console.log(user_pass);
		xhr.open("POST", propertyHostConfig.hostUrl+"/user/register?"+user_pass+"&Content-Type=application%2Fjson");
		
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

		xhr.send(data);
				
  };



    $scope.googleLogin = function(){
				  GooglePlus.login().then(function (authResult) {
					  console.log(authResult);
					  var userId,providerId,providerUserId,rank=1,displayName,profileUrl,
						imageUrl,accessToken,secret="",expireTime,refreshToken="",firstName,lastName;
						
					  GooglePlus.getUser().then(function (user) {
						  firstName=user.given_name;
						  userId=user.email;
						  providerUserId=user.id;
						  displayName=user.name;
						  providerId="Google+";
						  accessToken=authResult.access_token;
						  profileUrl=user.link;
						  imageUrl=user.picture;
						  expireTime=authResult.expires_at;
							var xhr = new XMLHttpRequest();
							var data = null;	
							
							xhr.addEventListener("readystatechange", function () {
						  if (this.readyState === 4) {
							  var resp=this.responseText;
							if(resp==="duplicate"||resp==="success"){
								$window.location.href = 'index.html#/home?name='+userId+'&isLogin=true&register=normal';
								$scope.IsSuccess = true;
								 $scope.$apply();
							}else{
									$window.location.href = 'index.html#/page-login';
									$scope.error="Authentication failed. Please contact Admin";
									$scope.IsSuccess = false;
									 $scope.$apply();
								}
						  }
						});
						var urlencoded=propertyHostConfig.hostUrl+"/user/register?firstName="+firstName+"&lastName="+user.family_name+"&email="+userId+"&password="+null+"&passwordVerification=null&Content-Type=application/json&signInProvider=GOOGLE&socialUser={\"userId\":\""+userId+"\",\"providerId\":\""+providerId+"\",\"providerUserId\":\""+providerUserId+"\",\"rank\":\""+rank+"\",\"displayName\":\""+displayName+"\",\"profileUrl\":\""+profileUrl+"\",\"imageUrl\":\""+imageUrl+"\",\"accessToken\": \""+accessToken+"\",\"secret\":\""+secret+"\",\"expireTime\":\""+expireTime+"\",\"refreshToken\":\""+refreshToken+"\"}";
							xhr.open("POST", urlencoded);
							xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
							xhr.send(data);						
					
						  console.log(urlencoded);
					  });
				  }, function (err) {
					  console.log(err);
				  });
		}

  $scope.facebookLogin = function() {
	
	  var userId,providerId="FACEBOOK",providerUserId,rank=1,displayName,profileUrl,imageUrl,accessToken,secret=null,expireTime,refreshToken=null;
	  var _self = this;
		  FB.getLoginStatus( function(res) {
			if (res.status === 'connected') {
					accessToken=res.authResponse.accessToken;
					providerUserId=res.authResponse.userID;
					expireTime=res.authResponse.expiresIn;
					
				  FB.api('/me',{ locale: 'en_US', fields: 'name, email,link' },function(res) {
					  userId=res.email;
					  displayName=res.name;
					  $scope.loginName=displayName;
					  profileUrl=res.link;
					  
				  });
				  
				   FB.api("/me/picture?type=square",  function(response) { 
				   imageUrl=response.data.url;
				   var i = 0, length = imageUrl.length;
						for( i; i < length; i++) {
						imageUrl=imageUrl.replace("&","%26");
						}
					  var xhr = new XMLHttpRequest();
					  var data = null;
						xhr.withCredentials = true;
						xhr.addEventListener("readystatechange", function () {
						  if (this.readyState === 4) {
							  var resp=this.responseText;
							if(resp==="duplicate"||resp==="success"){
								$window.location.href = 'index.html#/home?name='+userId+'&isLogin=true&register=normal';
								$scope.IsSuccess = true;
								 $scope.$apply();
							}else{
									$window.location.href = 'index.html#/page-login';
									$scope.error="Authentication failed. Please contact Admin";
									$scope.IsSuccess = false;
									 $scope.$apply();
								}
						  }
						});
						
						var urlencoded=propertyHostConfig.hostUrl+"/user/register?firstName=Srinivasa&lastName=V&email=acharyasrinivas231@gmail.com&password=null&passwordVerification=null&Content-Type=application/json&signInProvider=FACEBOOK&socialUser={\"userId\":\""+userId+"\",\"providerId\":\""+providerId+"\",\"providerUserId\":\""+providerUserId+"\",\"rank\":\""+rank+"\",\"displayName\":\""+displayName+"\",\"profileUrl\":\""+profileUrl+"\",\"imageUrl\":\""+imageUrl+"\",\"accessToken\": \""+accessToken+"\",\"secret\":\""+secret+"\",\"expireTime\":\""+expireTime+"\",\"refreshToken\":\""+refreshToken+"\"}";
						
						xhr.open("POST", urlencoded);
						xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
						xhr.send(data);
					});
				
				}
			else {
				FB.login(function(response) {
				  if (response.authResponse) {
					 // Login success, check auth_nonce...
					 checkNonce(response.authResponse.access_token);
				  } else {
					// User cancelled
				  }
				}, { auth_type: 'reauthenticate', auth_nonce: '{random-nonce}' });
			}
		  }, {scope: 'email,public_profile', return_scopes: true});
		  
		  
		  
  };
  
  
  getUserInfo = function() {


}
 function checkNonce(access_token) {
	var userId,providerId="FACEBOOK",providerUserId,rank=1,displayName,profileUrl,imageUrl,accessToken,secret=null,expireTime,refreshToken=null;
    		  FB.getLoginStatus( function(res) {
			if (res.status === 'connected') {
			  
				  		accessToken=res.authResponse.accessToken;
					providerUserId=res.authResponse.userID;
					expireTime=res.authResponse.expiresIn;
					
				  FB.api('/me',{ locale: 'en_US', fields: 'name, email,link' },function(res) {
					  userId=res.email;
					  displayName=res.name;
					  $scope.loginName=displayName;
					  profileUrl=res.link;
					  
				  });
				  
				   FB.api("/me/picture?type=square",  function(response) { 
				   imageUrl=response.data.url;
				   var i = 0, length = imageUrl.length;
						for( i; i < length; i++) {
						imageUrl=imageUrl.replace("&","%26");
						}
					  var xhr = new XMLHttpRequest();
					  var data = null;
						xhr.withCredentials = true;
						xhr.addEventListener("readystatechange", function () {
						  if (this.readyState === 4) {
							  var resp=this.responseText;
							if(resp==="duplicate"||resp==="success"){
								$window.location.href = 'index.html#/home?name='+userId+'&isLogin=true&register=normal';
								$scope.IsSuccess = true;
								 $scope.$apply();
							}else{
									$window.location.href = 'index.html#/page-login';
									$scope.error="Authentication failed. Please contact Admin";
									$scope.IsSuccess = false;
									 $scope.$apply();
								}
						  }
						});
						
						var urlencoded=propertyHostConfig.hostUrl+"/user/register?firstName=Srinivasa&lastName=V&email=acharyasrinivas231@gmail.com&password=null&passwordVerification=null&Content-Type=application/json&signInProvider=FACEBOOK&socialUser={\"userId\":\""+userId+"\",\"providerId\":\""+providerId+"\",\"providerUserId\":\""+providerUserId+"\",\"rank\":\""+rank+"\",\"displayName\":\""+displayName+"\",\"profileUrl\":\""+profileUrl+"\",\"imageUrl\":\""+imageUrl+"\",\"accessToken\": \""+accessToken+"\",\"secret\":\""+secret+"\",\"expireTime\":\""+expireTime+"\",\"refreshToken\":\""+refreshToken+"\"}";
						
						xhr.open("POST", urlencoded);
						xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
						xhr.send(data);
					});
			}
			else {
				alet("Access  denied")
			}
		  }, {scope: 'email,public_profile', return_scopes: true});
  }
logout = function() {

  var _self = this;

  FB.logout(function(response) {
    $rootScope.$apply(function() {
      $rootScope.user = _self.user = {};
    });
  });

}	
});
	
app.controller('rathaYathreCntrl',function($rootScope,$scope,$location,$http,$window){	
	$window.scrollTo(0, 0);
$('.homepage-slider').hide();
$('.imageSection').hide();
	$scope.register = function() {
		window.alert("Thank you for your interest !!! \n We look forward to the pleasure of your company!!!!. Please contact admin to join whats-group for daily update");
  }
});

app.controller('memberRegisterCntrl',function($rootScope,$scope,$location,$http,$window,GooglePlus){	
	$window.scrollTo(0, 0);
$('.homepage-slider').hide();
$('.imageSection').hide();
$scope.gender = "Male";
$scope.submit = function() {
		var data = null,userName=$scope.username;
		var xhr = new XMLHttpRequest();
		var user_pass = "firstName="+userName+"&lastName="+userName+"&email="+$scope.email+"&password="+$scope.password+"&passwordVerification="+$scope.password;
		xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function () {
		  if (this.readyState === 4) {
			console.log(this.responseText);
			if(this.responseText=='success'){
				$window.location.href = 'index.html#/home?name='+userName+'&isLogin=true&register=member';
				$scope.IsSuccess = true;
				 $scope.$apply();
			}else{
				$window.location.href = 'index.html#/page-login';
				$scope.error="Username or password is incorrect.";
				$scope.IsSuccess = false;
				 $scope.$apply();
			}
		  }
		});
console.log(user_pass);
		xhr.open("POST", propertyHostConfig.hostUrl+"/user/register?"+user_pass+"&Content-Type=application%2Fjson");
		
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

		xhr.send(data);
				
  };

    $scope.googleLogin = function(){
				  GooglePlus.login().then(function (authResult) {
					  console.log(authResult);
					  var userId,providerId,providerUserId,rank=1,displayName,profileUrl,
						imageUrl,accessToken,secret="",expireTime,refreshToken="",firstName,lastName;
						
					  GooglePlus.getUser().then(function (user) {
						  firstName=user.given_name;
						  userId=user.email;
						  providerUserId=user.id;
						  displayName=user.name;
						  providerId="Google+";
						  accessToken=authResult.access_token;
						  profileUrl=user.link;
						  imageUrl=user.picture;
						  expireTime=authResult.expires_at;
							var xhr = new XMLHttpRequest();
							var data = null;	
							
							xhr.addEventListener("readystatechange", function () {
						  if (this.readyState === 4) {
							  var resp=this.responseText;
							if(resp==="duplicate"||resp==="success"){
								$window.location.href = 'index.html#/home?name='+userId+'&isLogin=true&register=member';
								$scope.IsSuccess = true;
								 $scope.$apply();
							}else{
									$window.location.href = 'index.html#/page-login';
									$scope.error="Authentication failed. Please contact Admin";
									$scope.IsSuccess = false;
									 $scope.$apply();
								}
						  }
						});
						var urlencoded=propertyHostConfig.hostUrl+"/user/register?firstName="+firstName+"&lastName="+user.family_name+"&email="+userId+"&password="+null+"&passwordVerification=null&Content-Type=application/json&signInProvider=GOOGLE&socialUser={\"userId\":\""+userId+"\",\"providerId\":\""+providerId+"\",\"providerUserId\":\""+providerUserId+"\",\"rank\":\""+rank+"\",\"displayName\":\""+displayName+"\",\"profileUrl\":\""+profileUrl+"\",\"imageUrl\":\""+imageUrl+"\",\"accessToken\": \""+accessToken+"\",\"secret\":\""+secret+"\",\"expireTime\":\""+expireTime+"\",\"refreshToken\":\""+refreshToken+"\"}";
							xhr.open("POST", urlencoded);
							xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
							xhr.send(data);						
					
						  console.log(urlencoded);
					  });
				  }, function (err) {
					  console.log(err);
				  });
		}

  $scope.facebookLogin = function() {
	
	  var userId,providerId="FACEBOOK",providerUserId,rank=1,displayName,profileUrl,imageUrl,accessToken,secret=null,expireTime,refreshToken=null;
	  var _self = this;
		  FB.getLoginStatus( function(res) {
			if (res.status === 'connected') {
					accessToken=res.authResponse.accessToken;
					providerUserId=res.authResponse.userID;
					expireTime=res.authResponse.expiresIn;
					
				  FB.api('/me',{ locale: 'en_US', fields: 'name, email,link' },function(res) {
					  userId=res.email;
					  displayName=res.name;
					  $scope.loginName=displayName;
					  profileUrl=res.link;
					  
				  });
				  
				   FB.api("/me/picture?type=square",  function(response) { 
				   imageUrl=response.data.url;
				   var i = 0, length = imageUrl.length;
						for( i; i < length; i++) {
						imageUrl=imageUrl.replace("&","%26");
						}
					  var xhr = new XMLHttpRequest();
					  var data = null;
						xhr.withCredentials = true;
						xhr.addEventListener("readystatechange", function () {
						  if (this.readyState === 4) {
							  var resp=this.responseText;
							if(resp==="duplicate"||resp==="success"){
								$window.location.href = 'index.html#/home?name='+userId+'&isLogin=true&register=member';
								$scope.IsSuccess = true;
								 $scope.$apply();
							}else{
									$window.location.href = 'index.html#/page-login';
									$scope.error="Authentication failed. Please contact Admin";
									$scope.IsSuccess = false;
									 $scope.$apply();
								}
						  }
						});
						
						var urlencoded=propertyHostConfig.hostUrl+"/user/register?firstName=Srinivasa&lastName=V&email=acharyasrinivas231@gmail.com&password=null&passwordVerification=null&Content-Type=application/json&signInProvider=FACEBOOK&socialUser={\"userId\":\""+userId+"\",\"providerId\":\""+providerId+"\",\"providerUserId\":\""+providerUserId+"\",\"rank\":\""+rank+"\",\"displayName\":\""+displayName+"\",\"profileUrl\":\""+profileUrl+"\",\"imageUrl\":\""+imageUrl+"\",\"accessToken\": \""+accessToken+"\",\"secret\":\""+secret+"\",\"expireTime\":\""+expireTime+"\",\"refreshToken\":\""+refreshToken+"\"}";
						
						xhr.open("POST", urlencoded);
						xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
						xhr.send(data);
					});
				
				}
			else {
				FB.login(function(response) {
				  if (response.authResponse) {
					 // Login success, check auth_nonce...
					 checkNonce(response.authResponse.access_token);
				  } else {
					// User cancelled
				  }
				}, { auth_type: 'reauthenticate', auth_nonce: '{random-nonce}' });
			}
		  }, {scope: 'email,public_profile', return_scopes: true});
		  
		  
		  
  };
  
  
  getUserInfo = function() {


}
 function checkNonce(access_token) {
	var userId,providerId="FACEBOOK",providerUserId,rank=1,displayName,profileUrl,imageUrl,accessToken,secret=null,expireTime,refreshToken=null;
    		  FB.getLoginStatus( function(res) {
			if (res.status === 'connected') {
			  
				  		accessToken=res.authResponse.accessToken;
					providerUserId=res.authResponse.userID;
					expireTime=res.authResponse.expiresIn;
					
				  FB.api('/me',{ locale: 'en_US', fields: 'name, email,link' },function(res) {
					  userId=res.email;
					  displayName=res.name;
					  $scope.loginName=displayName;
					  profileUrl=res.link;
					  
				  });
				  
				   FB.api("/me/picture?type=square",  function(response) { 
				   imageUrl=response.data.url;
				   var i = 0, length = imageUrl.length;
						for( i; i < length; i++) {
						imageUrl=imageUrl.replace("&","%26");
						}
					  var xhr = new XMLHttpRequest();
					  var data = null;
						xhr.withCredentials = true;
						xhr.addEventListener("readystatechange", function () {
						  if (this.readyState === 4) {
							  var resp=this.responseText;
							if(resp==="duplicate"||resp==="success"){
								$window.location.href = 'index.html#/home?name='+userId+'&isLogin=true&register=member';
								$scope.IsSuccess = true;
								 $scope.$apply();
							}else{
									$window.location.href = 'index.html#/page-login';
									$scope.error="Authentication failed. Please contact Admin";
									$scope.IsSuccess = false;
									 $scope.$apply();
								}
						  }
						});
						
						var urlencoded=propertyHostConfig.hostUrl+"/user/register?firstName=Srinivasa&lastName=V&email=acharyasrinivas231@gmail.com&password=null&passwordVerification=null&Content-Type=application/json&signInProvider=FACEBOOK&socialUser={\"userId\":\""+userId+"\",\"providerId\":\""+providerId+"\",\"providerUserId\":\""+providerUserId+"\",\"rank\":\""+rank+"\",\"displayName\":\""+displayName+"\",\"profileUrl\":\""+profileUrl+"\",\"imageUrl\":\""+imageUrl+"\",\"accessToken\": \""+accessToken+"\",\"secret\":\""+secret+"\",\"expireTime\":\""+expireTime+"\",\"refreshToken\":\""+refreshToken+"\"}";
						
						xhr.open("POST", urlencoded);
						xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
						xhr.send(data);
					});
			}
			else {
				alet("Access  denied")
			}
		  }, {scope: 'email,public_profile', return_scopes: true});
  }
logout = function() {

  var _self = this;

  FB.logout(function(response) {
    $rootScope.$apply(function() {
      $rootScope.user = _self.user = {};
    });
  });

}		
});

app.controller('discussionAndFormCntrl',function($rootScope,$scope,$location,$http,$window,$compile){	
	$window.scrollTo(0, 0);
$('.homepage-slider').hide();
$('.imageSection').hide();

var url=propertyHostConfig.hostUrl+"/article/getAllArticle";
	  var xhr = new XMLHttpRequest();
	  var data = null;
	  var imageId = document.getElementById("blogImage");
	 var imageSrc = imageId.getAttribute("src");
	
		xhr.addEventListener("readystatechange", function () {
		  if (this.readyState === 4) {
			  var resp=this.responseText;
			  var el="";
			 var response= JSON.parse(resp)
			console.log(response[0].dateOfPost);
			console.log(response[0].categoty);
			document.getElementById("dateOfPost").innerHTML = response[0].dateOfPost;
			document.getElementById("title").innerHTML = response[0].title;
			document.getElementById("description").innerHTML = response[0].description;
			for (var i = 0; i < response.length&&i<5; i++){
				var obj = response[i];
				 el =el+"<li><a  ng-click=\"discussion("+obj.articleId+");\">"+obj.title+"</a></li>";
				}
				var element = angular.element(document.querySelector('#recent-posts-id'));
				var generated = element.html(el);
				$compile(generated.contents())($scope);

			imageId.setAttribute("src", "demo-files\\"+response[0].image);
		  }
		});
			xhr.open("POST", url);
			xhr.setRequestHeader("content-type", "application/json");
			xhr.send(data);
   $scope.discussion = function(i) {
	  var url=propertyHostConfig.hostUrl+"/article/getArticle?articleId="+i;
	  var xhr = new XMLHttpRequest();
	  var data = null;
	  var imageId = document.getElementById("blogImage");
	 var imageSrc = imageId.getAttribute("src");
	  xhr.addEventListener("readystatechange", function () {
		  if (this.readyState === 4) {
			  var resp=this.responseText;
			  var el="";
			 var response= JSON.parse(resp)
			document.getElementById("dateOfPost").innerHTML = response.dateOfPost;
			document.getElementById("title").innerHTML = response.title;
			document.getElementById("description").innerHTML = response.description;
			imageId.setAttribute("src", "demo-files\\"+response.image);
		  }
		});
			xhr.open("POST", url);
			xhr.setRequestHeader("content-type", "application/json");
			xhr.send(data);
  }
});

app.controller('aboutCntrl',function($rootScope,$scope,$location,$http,$window){	
	$window.scrollTo(0, 0);
$('.homepage-slider').hide();
$('.imageSection').hide();
	
});
app.controller('spirutualActivityCntrl',function($rootScope,$scope,$location,$http,$window){	
	$window.scrollTo(0, 0);
$('.homepage-slider').hide();
$('.imageSection').hide();
	$scope.register = function() {
		window.alert("Thank you for your interest !!! \n We look forward to the pleasure of your company!!!!. Please contact admin to join whats-group for daily update");
  }
});


app.factory('getVideoInstances', function($http) {

    var getData = function() {
        // Angular $http() and then() both return promises themselves 
        return $http({method:"GET", url:propertyHostConfig.hostUrl+"/article/getVideo?name=-1"}).then(function(result){

            // What we return here is the data that will be accessible 
            // to us after the promise resolves
            return result.data;
        });
    };


    return { getData: getData };
});



app.controller('videoGalleryCntrl',
        function ($rootScope,$sce,$location,$http,$window,$timeout,getVideoInstances,$scope,$compile,) {

		   var videoPlayer = '<videogular vg-player-ready="controller.onPlayerReady($API)" vg-complete="controller.onCompleteVideo()" vg-theme="controller.config.theme.url"  id="videogular_id"><vg-media vg-src="controller.config.sources" vg-tracks="controller.config.tracks"></vg-media><vg-controls><vg-play-pause-button></vg-play-pause-button><vg-time-display>{{ currentTime | date:"mm:ss":"+0000" }}</vg-time-display><vg-scrub-bar><vg-scrub-bar-current-time></vg-scrub-bar-current-time></vg-scrub-bar><vg-time-display>{{ timeLeft | date:"mm:ss":"+0000" }}</vg-time-display><vg-volume><vg-mute-button></vg-mute-button><vg-volume-bar></vg-volume-bar></vg-volume><vg-fullscreen-button></vg-fullscreen-button></vg-controls><vg-overlay-play></vg-overlay-play><vg-buffering></vg-buffering><vg-poster vg-url="controller.config.plugins.poster"></vg-poster></videogular>';
        var ytPlayer = '<videogular vg-player-ready="controller.onPlayerReady($API)" vg-complete="controller.onCompleteVideo()" vg-theme="controller.config.theme.url" vg-youtube="rel=1;showinfo=1" id="videogular_id"><vg-media vg-src="controller.config.sources" vg-tracks="controller.config.tracks" vg-youtube="rel=1;showinfo=1"></vg-media><vg-controls><vg-play-pause-button></vg-play-pause-button><vg-time-display>{{ currentTime | date:"mm:ss":"+0000" }}</vg-time-display><vg-scrub-bar><vg-scrub-bar-current-time></vg-scrub-bar-current-time></vg-scrub-bar><vg-time-display>{{ timeLeft | date:"mm:ss":"+0000" }}</vg-time-display><vg-volume><vg-mute-button></vg-mute-button><vg-volume-bar></vg-volume-bar></vg-volume><vg-fullscreen-button></vg-fullscreen-button></vg-controls><vg-overlay-play></vg-overlay-play><vg-buffering></vg-buffering><vg-poster vg-url="controller.config.plugins.poster"></vg-poster></videogular>';
		var aPlayer='<videogular vg-theme="controller.config.theme.url" class="videogular-container audio">        <vg-media vg-src="controller.config.sources" vg-type="audio"></vg-media><vg-controls><vg-play-pause-button></vg-play-pause-button><vg-time-display>{{ currentTime | date:"mm:ss":"+0000" }}</vg-time-display><vg-scrub-bar><vg-scrub-bar-current-time></vg-scrub-bar-current-time></vg-scrub-bar><vg-time-display>{{ timeLeft | date:"mm:ss":"+0000" }}</vg-time-display><vg-volume><vg-mute-button></vg-mute-button></vg-volume></vg-controls></videogular>';
		
        var container = angular.element(document.querySelector(".videogular-container"));
		//container.removeChild(elem);
		var controller1 = this,i=0;
			
            controller1.state = null;
            controller1.API = null;
            controller1.currentVideo = 0;
			var videoList = [],temp="",videoNameList=$scope.videoNameList;
			var path="http://127.0.0.1:8181/AngularTaulavaMadhwaOkkoota/demo-files/",
			len=videoNameList.length;
			for(var i = 0; i< len; i++){
			 console.log("temp-----"+videoNameList[i].type);
			 if(videoNameList[i].type=='mp4'){
			url="http://127.0.0.1:8181/AngularTaulavaMadhwaOkkoota/demo-files/"+videoNameList[i].name+".mp4";
			videoList.push({src: $sce.trustAsResourceUrl(url), type: "video/mp4"});
			}else if(videoNameList[i].type=='mp3'){
			url="http://127.0.0.1:8181/AngularTaulavaMadhwaOkkoota/demo-files/"+videoNameList[i].name+".mp3";
			videoList.push({src: $sce.trustAsResourceUrl(url), type: "audio/mp3"});
			}else if(videoNameList[i].type=='link'){
				url=videoNameList[i].path;
				url=url.replace(/['"]+/g, '')
				//url="https://www.youtube.com/watch?v=SrBHZTW9Ob8"
				console.log(url);
			videoList.push({src: url });
			}
		}
			// document.getElementById("playListId").innerHTML=newInput;
            controller1.state = null;
            controller1.API = null;
            controller1.currentVideo = 0;

            controller1.onPlayerReady = function(API) {
                controller1.API = API;
            };

            controller1.onCompleteVideo = function() {
                controller1.isCompleted = true;

                controller1.currentVideo++;

                if (controller1.currentVideo >= controller1.videos.length) controller1.currentVideo = 0;

                controller1.setVideo(controller1.currentVideo);
            };

			var videos=[];
			for (var i=0; i<videoList.length;i++){
				var sources=[];
				sources.push(videoList[i]);
				videos.push({sources:sources});
				
			}
			console.log(JSON.stringify(videos));
			
            controller1.videos = videos;

            controller1.config = {
                preload: "none",

                sources: controller1.videos[0].sources,
                theme: {
                    url: "https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css"
                },
                plugins: {
                    poster: "http://www.videogular.com/assets/images/videogular.png"
                }
            };

            controller1.setVideo = function(index) {
				console.log(index.video.type);
				//container.removeChild(elem);
				
				if(index.video.type=='link'){
						var elem = angular.element(ytPlayer);
						var compiled = $compile(elem)($scope);
						container.empty();
						container.append(elem);
					}else if(index.video.type=='mp3'){
						var elem = angular.element(aPlayer);
						var compiled = $compile(elem)($scope);
						container.empty();
						container.append(elem);	
					}else{
						var elem = angular.element(videoPlayer);
						var compiled = $compile(elem)($scope);
						container.empty();
						container.append(elem);	
					}
				index=index.$index;
				console.log(index);
				console.log(JSON.stringify(controller1.videos));
                controller1.API.stop();
                controller1.currentVideo = index;
                controller1.config.sources = controller1.videos[index].sources;
                $timeout(controller1.API.play.bind(controller1.API), 100);
            };
			   
			   
			   
		//	});
        }
    );



app.controller('socialActivityCntrl',function($rootScope,$scope,$location,$http,$window){	
	$window.scrollTo(0, 0);
$('.homepage-slider').hide();
$('.imageSection').hide();	
$scope.register = function() {
		window.alert("Thank you for your interest !!! \n We look forward to the pleasure of your company!!!!. Please contact admin to join whats-group for daily update");
  }
});

app.controller('vidyaNidhiCntrl',function($rootScope,$scope,$location,$http,$window){	
	$window.scrollTo(0, 0);
$('.homepage-slider').hide();
$('.imageSection').hide();

$scope.register = function() {
		window.alert("Thank you for your interest !!! \n We look forward to the pleasure of your company!!!!. Please contact admin to join whats-group for daily update");
  }
});

app.controller('passwordResetCntrl',function($rootScope,$scope,$location,$http,$window){	
	$window.scrollTo(0, 0);
$('.homepage-slider').hide();
$('.imageSection').hide();
});

app.controller('contactCntrl',function($rootScope,$scope,$location,$http,$window){	
	$window.scrollTo(0, 0);
$('.homepage-slider').hide();
	if($('#contact-us-map').length > 0){ //Checks if there is a map element
		var map = L.map('contact-us-map', {
			center: [12.89805, 77.52249],
			scrollWheelZoom: false,
			zoom: 15
		});
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
		
		L.marker([12.89805, 77.52249]).addTo(map).bindPopup("<b>Taulava Madhwa Okkoota</b><br/>#524,10th C Main<br/>AGB layout, Opp Hesaraghatta Road,<br/>Chikkasandra Post, Banglore</br>India").openPopup();
	}
	
	$scope.register = function() {
		window.alert("Thank you for your feedback!!!");
		$window.location.href = 'index.html#/home';
  }
	
});

app.config(['$httpProvider', function ($httpProvider) {
  //Reset headers to avoid OPTIONS request (aka preflight)
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
}]).controller('loginCtrl',function($rootScope,$scope,$location,$http,$window,GooglePlus){
	$('.homepage-slider').hide();
	$('.imageSection').hide();
	
	 $scope.IsSuccess = true;
	  $scope.loginName = "";
	$scope.error='';
	$scope.submit = function() {
		var data = null;
		var xhr = new XMLHttpRequest();
		var user_pass = "username="+$scope.username+"&password="+$scope.password;
		xhr.withCredentials = true;
		var userId=$scope.username;
		xhr.addEventListener("readystatechange", function () {
		  if (this.readyState === 4) {
			console.log(this.responseText);
			if(this.responseText=='success'){
				$window.location.href = 'index.html#/home?name='+userId+'&isLogin=true&register=login';
								$scope.IsSuccess = true;
								 $scope.$apply();
			}else{
				$window.location.href = 'index.html#/page-login';
				$scope.error="Username or password is incorrect.";
				$scope.IsSuccess = false;
				 $scope.$apply();
			}
		  }
		});

		xhr.open("POST", propertyHostConfig.hostUrl+"/login/authenticate?"+user_pass+"&Content-Type=application%2Fjson");
		
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

		xhr.send(data);
				
  };
    $scope.googleLogin = function(){
				  GooglePlus.login().then(function (authResult) {
					  console.log(authResult);
					  var userId,providerId,providerUserId,rank=1,displayName,profileUrl,
						imageUrl,accessToken,secret="",expireTime,refreshToken="",firstName,lastName;
						
					  GooglePlus.getUser().then(function (user) {
						  firstName=user.given_name;
						  userId=user.email;
						  providerUserId=user.id;
						  displayName=user.name;
						  providerId="Google+";
						  accessToken=authResult.access_token;
						  profileUrl=user.link;
						  imageUrl=user.picture;
						  expireTime=authResult.expires_at;
							var xhr = new XMLHttpRequest();
							var data = null;	
							
							xhr.addEventListener("readystatechange", function () {
						  if (this.readyState === 4) {
							  var resp=this.responseText;
							if(resp==="duplicate"||resp==="success"){
								$window.location.href = 'index.html#/home?name='+userId+'&isLogin=true&register=login';
								$scope.IsSuccess = true;
								 $scope.$apply();
							}else{
									$window.location.href = 'index.html#/page-login';
									$scope.error="Authentication failed. Please contact Admin";
									$scope.IsSuccess = false;
									 $scope.$apply();
								}
						  }
						});
						var urlencoded=propertyHostConfig.hostUrl+"/user/register?firstName="+firstName+"&lastName="+user.family_name+"&email="+userId+"&password="+null+"&passwordVerification=null&Content-Type=application/json&signInProvider=GOOGLE&socialUser={\"userId\":\""+userId+"\",\"providerId\":\""+providerId+"\",\"providerUserId\":\""+providerUserId+"\",\"rank\":\""+rank+"\",\"displayName\":\""+displayName+"\",\"profileUrl\":\""+profileUrl+"\",\"imageUrl\":\""+imageUrl+"\",\"accessToken\": \""+accessToken+"\",\"secret\":\""+secret+"\",\"expireTime\":\""+expireTime+"\",\"refreshToken\":\""+refreshToken+"\"}";
							xhr.open("POST", urlencoded);
							xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
							xhr.send(data);						
					
						  console.log(urlencoded);
					  });
				  }, function (err) {
					  console.log(err);
				  });
		}

  $scope.facebookLogin = function() {
	  var userId,providerId="FACEBOOK",providerUserId,rank=1,displayName,profileUrl,imageUrl,accessToken,secret=null,expireTime,refreshToken=null;
	  var _self = this;
		  FB.getLoginStatus( function(res) {
			if (res.status === 'connected') {
					accessToken=res.authResponse.accessToken;
					providerUserId=res.authResponse.userID;
					expireTime=res.authResponse.expiresIn;
					
				  FB.api('/me',{ locale: 'en_US', fields: 'name, email,link' },function(res) {
					  userId=res.email;
					  displayName=res.name;
					  $scope.loginName=displayName;
					  profileUrl=res.link;
					  
				  });
				  
				   FB.api("/me/picture?type=square",  function(response) { 
				   imageUrl=response.data.url;
				   var i = 0, length = imageUrl.length;
						for( i; i < length; i++) {
						imageUrl=imageUrl.replace("&","%26");
						}
					  var xhr = new XMLHttpRequest();
					  var data = null;
						xhr.withCredentials = true;
						xhr.addEventListener("readystatechange", function () {
						  if (this.readyState === 4) {
							  var resp=this.responseText;
							if(resp==="duplicate"||resp==="success"){
								$window.location.href = 'index.html#/home?name='+userId+'&isLogin=true&register=login';
								$scope.IsSuccess = true;
								 $scope.$apply();
							}else{
									$window.location.href = 'index.html#/page-login';
									$scope.error="Authentication failed. Please contact Admin";
									$scope.IsSuccess = false;
									 $scope.$apply();
								}
						  }
						});
						
						var urlencoded=propertyHostConfig.hostUrl+"/user/register?firstName=Srinivasa&lastName=V&email=acharyasrinivas231@gmail.com&password=null&passwordVerification=null&Content-Type=application/json&signInProvider=FACEBOOK&socialUser={\"userId\":\""+userId+"\",\"providerId\":\""+providerId+"\",\"providerUserId\":\""+providerUserId+"\",\"rank\":\""+rank+"\",\"displayName\":\""+displayName+"\",\"profileUrl\":\""+profileUrl+"\",\"imageUrl\":\""+imageUrl+"\",\"accessToken\": \""+accessToken+"\",\"secret\":\""+secret+"\",\"expireTime\":\""+expireTime+"\",\"refreshToken\":\""+refreshToken+"\"}";
						
						xhr.open("POST", urlencoded);
						xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
						xhr.send(data);
					});
				
				}
			else {
				FB.login(function(response) {
				  if (response.authResponse) {
					 // Login success, check auth_nonce...
					 checkNonce(response.authResponse.access_token);
				  } else {
					// User cancelled
				  }
				}, { auth_type: 'reauthenticate', auth_nonce: '{random-nonce}' });
			}
		  }, {scope: 'email,public_profile', return_scopes: true});
		  
		  
		  
  };
  



 function checkNonce(access_token) {
	var userId,providerId="FACEBOOK",providerUserId,rank=1,displayName,profileUrl,imageUrl,accessToken,secret=null,expireTime,refreshToken=null;
    		  FB.getLoginStatus( function(res) {
			if (res.status === 'connected') {
			  
				  		accessToken=res.authResponse.accessToken;
					providerUserId=res.authResponse.userID;
					expireTime=res.authResponse.expiresIn;
					
				  FB.api('/me',{ locale: 'en_US', fields: 'name, email,link' },function(res) {
					  userId=res.email;
					  displayName=res.name;
					  $scope.loginName=displayName;
					  profileUrl=res.link;
					  
				  });
				  
				   FB.api("/me/picture?type=square",  function(response) { 
				   imageUrl=response.data.url;
				   var i = 0, length = imageUrl.length;
						for( i; i < length; i++) {
						imageUrl=imageUrl.replace("&","%26");
						}
					  var xhr = new XMLHttpRequest();
					  var data = null;
						xhr.withCredentials = true;
						xhr.addEventListener("readystatechange", function () {
						  if (this.readyState === 4) {
							  var resp=this.responseText;
							if(resp==="duplicate"||resp==="success"){
								$window.location.href = 'index.html#/home?name='+userId+'&isLogin=true&register=login';
								$scope.IsSuccess = true;
								 $scope.$apply();
							}else{
									$window.location.href = 'index.html#/page-login';
									$scope.error="Authentication failed. Please contact Admin";
									$scope.IsSuccess = false;
									 $scope.$apply();
								}
						  }
						});
						
						var urlencoded=propertyHostConfig.hostUrl+"/user/register?firstName=Srinivasa&lastName=V&email=acharyasrinivas231@gmail.com&password=null&passwordVerification=null&Content-Type=application/json&signInProvider=FACEBOOK&socialUser={\"userId\":\""+userId+"\",\"providerId\":\""+providerId+"\",\"providerUserId\":\""+providerUserId+"\",\"rank\":\""+rank+"\",\"displayName\":\""+displayName+"\",\"profileUrl\":\""+profileUrl+"\",\"imageUrl\":\""+imageUrl+"\",\"accessToken\": \""+accessToken+"\",\"secret\":\""+secret+"\",\"expireTime\":\""+expireTime+"\",\"refreshToken\":\""+refreshToken+"\"}";
						
						xhr.open("POST", urlencoded);
						xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
						xhr.send(data);
					});
			}
			else {
				alet("Access  denied")
			}
		  }, {scope: 'email,public_profile', return_scopes: true});
  }
logout = function() {

  var _self = this;

  FB.logout(function(response) {
    $rootScope.$apply(function() {
      $rootScope.user = _self.user = {};
    });
  });

}
});