		
        $scope.getFileDetails = function (e) {
            $scope.files = [];
			$scope.theFileNames= [];	
            $scope.$apply(function () {
                for (var i = 0; i < e.files.length; i++) {
                    $scope.files.push(e.files[i]);
					$scope.theFileNames.push((e.files[i].name).split(".")[0]);
					console.log( (e.files[i].name).split(".")[0]);
                }

            });
        };
		
		
            $scope.uploadDocuments = function(){
				alert("Uploading!!!!");
					var fd = new FormData();
					for (var i in $scope.files) {
						fd.append("file", $scope.files[i]);
							console.log("post");
					}
    //We can send anything in name parameter, 
//it is hard coded to abc as it is irrelavant in this case.
                var uploadUrl = "http://localhost:8080/spring-social-normal-mvc/article/saveDocumentInfo?name="+ $scope.theFileNames;
			
                $http.post(uploadUrl, fd, {
                    headers: {'Content-Type': undefined},
					responseType: "arraybuffer",
					 withCredentials: false,
					transformRequest: angular.identity,
					 progress: function(e){console.log("JJJJJ");}
				
                }).success(function(){
					alert("Thank you for your contribution !!!!");
					 $('#fileDocument').val('');
					$window.location.href = 'index.html#/pdfUpload';
                })
                .error(function(error, status, headers, config) {
						console.log(error);
					  });
            }