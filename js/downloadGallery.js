app.factory('pdfServicePDF', function ($http) {
        return {
            downloadPdf: function (name) {
				alert(name);
			     return $http.get('http://localhost:8080/spring-social-normal-mvc/article/downloadPDF?pdfName='+name, { responseType: 'arraybuffer' }).then(function (response) {
                return response;
            });
        }
    };
});

app.directive('file', function () {
    return {
        scope: {
            file: '='
        },
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var file = event.target.files[0];
                scope.file = file ? file : undefined;
                scope.$apply();
            });
        }
    };
});


 app.directive('fileModel', ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var model = $parse(attrs.fileModel);
                    var modelSetter = model.assign;

                    element.bind('change', function(){
                        scope.$apply(function(){
                            modelSetter(scope, element[0].files[0]);
                        });
                    });
                }
            };
        }]);


app.filter('trim', function () {
    return function(value) {
        if(!angular.isString(value)) {
            return value;
        } 
			if(value.length>20){
				value=value.substring(0, 20);
				value=value+".....";
			}
		
        return value.replace(/^\s+|\s+$/g, ''); // you could use .trim, but it's not going to work in IE<9
    };
});

app.directive('bookmarklet', function () {
    return {
        restrict: 'A',
        scope: {},
        link: function($scope, element, attrs) {
            if (element[0].tagName !== 'A') {
                return;  // simply do nothing (or raise an error)
            }
            element[0].href = 'javascript:alert("It works in 1.4.1, too!")';
        }
    };
 });


app.controller('downloadGalleryCntrl',function($rootScope,$scope,$location,$http,$window,pdfServicePDF,Deals){	
$('.homepage-slider').hide();
$('.imageSection').hide();	

$('.pagination ul li a').addClass('btn btn-small ng-binding');
  
  Deals.all().then(function (deals) {
        $scope.choices = deals.data;
        console.log($scope.choices);
		$scope.filteredTodos = []
	  ,$scope.currentPage = 1
	  ,$scope.numPerPage = 10
	  ,$scope.maxSize = 5;
	  
	    $scope.numPages = function () {
			return Math.ceil($scope.choices.length / $scope.numPerPage);
		  };
		$scope.$watch('currentPage + numPerPage', function() {
		var begin = parseInt((($scope.currentPage - 1) * $scope.numPerPage))
		, end = parseInt(begin + $scope.numPerPage);
			var array=$scope.choices;
			$scope.choicesLength=array.length;
			$scope.filteredTodos = array.slice(begin, end);
	  });
    });

$scope.downloadPdf = function (name) {
            var a=document.getElementById("demo");
            a.style = "display: none";
			alert(a);
            pdfServicePDF.downloadPdf(name).then(function (result) {
				console.log(result);
                var file = new Blob([result.data], {type: 'application/pdf'});
                var fileURL = window.URL.createObjectURL(file);
                a.href = fileURL;
                a.download = $scope.choices[name-1].name+".pdf";
                a.click();
            });
        };
});


app.factory('Deals', function($http) {
    function getDeals() {
        return $http.get('http://localhost:8080/spring-social-normal-mvc/article/getAllPdfInfo')
        .success(function (data) {
            var deals = data;
            return deals;
        });
  }
  return {
    all: function() {
        return getDeals();
    },
    get: function(keyID) {
    }
  }
});

