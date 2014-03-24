angular.module('app.filter').
filter("ugroup",function(){
	return function(input){
		var uid = parseInt(input);
		if(!isNaN(uid) && UGROUP[uid]){
			return UGROUP[uid];
		}
		return "";
	}
});
