var pagination = angular.module("page",[]);

pagination.directive("pagination",function{
	return {
		restrict:"E",
		replace:true;
		templateUrl:"pagination.html"
	};
}).factory('PAGINATION', ['$rootScope', function($rootScope){
	return {
		draw: function(data){
			if($rootScope.drawPage){
				$rootScope.drawPage(data);
			}else{
				setTimeout(function(){
					$rootScope.drawPage(data);
				},1000);
			}
		}
		
	};
}]).controller('PaginationCtrl', ['$scope',"$element","$rootScope", function(){
	$scope.paginationShow = false;
	$scope.currentPage = 0;
	$scope.pagedItems = [];
	$scope.prePageSize = 10;

	$rootScope.drawPage = function(data){
		$scope.paginationShow = true;
		$scope.pagedItems = data.itmes;
		$scope.callback = data.callback;
		$scope.draw();
		$scope.$$phase || $scope.$apply();
	};

	$scope.range = function(size,start,end){
		var ret = [];

		if(size < end){
			end = size;
			start = size - $scope.prePageSize;
		}
		for(var i = start;i<end;i++){
			ret.push(i);
		}
		return ret;
	};
	$scope.prevPage = function(){
		if($scope.currentPage>0){
			$scope.currentPage --;
		}
	};
	$scope.nextPage = function(){
		if($scope.currentPage < $scope.pagedItems.length -1){
			$scope.currentPage ++;
		}
	};
	$scope.setPage = function() {
		$scope.currentPage = this.n;
	}
}])