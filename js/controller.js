angular.module('app.controller',[]).
controller('MyController', ['$scope', function($scope){
	$scope.name="chenyong";
	$scope.title="点击展开";
	$scope.text = "这里是内容！";
}]).
controller('TimeCtrl', ['$scope', function($scope){
	$scope.format = "M/d/yy h:mm:ss a";
}]).
controller('DialogCtrl', ['$scope','$timeout', function($scope,$timeout){
	$scope.name = "Thomas";
	$scope.show = true;
	$scope.closeDialog = function(){
		$scope.show = false;
		$timeout(function(){
			$scope.show = true;
		},2000);
	};

}]);