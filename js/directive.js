angular.module("app.directive",[]).
directive('greet', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			title:"=expanderTitle"
		}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
		template: '<div>'+
				'<div ng-click="toggle()">{{title}}</div>'
				+'<div ng-show="showMe" ng-transclude></div>'
				+'</div>',
		//templateUrl: 'html/greet_directive.html',
		replace: true,
		transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function(scope,element,attrs) {
			scope.showMe = false;
			scope.toggle = function(){
				scope.showMe = !scope.showMe;
			}
		}
	};
}).
directive("currentTime",["$timeout","dataFilter",function($timeout,dataFilter){

	function link(scope,element,attrs){
		var format,
			timeoutId;

		function updateTime(){
			element.text(new Date());
		}

		scope.$watch(attrs.currentTime,function(value){
			format = value;
			updateTime();
		});

		function scheduleUpdate(){
			timeoutId = $timeout(function(){
				updateTime();
				scheduleUpdate();
			},1000);
		}

		element.on('$destroy',function(){
			$timeout.cancel(timeoutId);
		});

		scheduleUpdate();
	}
	return{
		link:link
	};
}]).
directive("myDialog",function(){
	return {
		restrict:"EA",
		transclude:true,
		scope:{
			'close':"&onClose"
		},
		template: '<div class="alert">' 
				+'<a href class="close" ng-click="close()">&times;</a>'
				+'<div ng-transclude></div>'
				+ '</div>',
		link: function(scope,element){
			scope.name = "Jeff";
		}
	}
}).
directive("myDraggable",["$document",function($document){
	return function (scope,element,attr){
		var startX=0,
			startY=0,
			x=0,
			y=0;

		element.css({
			position:"relative",
			border:"1px solid black",
			backgroundColor:'lightgrey',
			cursor:"pointer"
		});
		element.on('mousedown', function(event) {
			event.preventDefault();
			/* Act on the event */
			startX = event.pageX -x;
			startY = event.pageY -y;
			$document.on("mousemove",mousemove);
			$document.on("mouseup",mouseup);
		});
		function mousemove(event){
			y = event.pageY - startY;
			x = event.pageX - startX;
			element.css({
				top: y+"px",
				left:x+"px"
			});
		};
		function mouseup(){
			$document.unbind("mousemove",mousemove);
			$document.unbind("mouseup",mouseup);
		}





	}
}]);

