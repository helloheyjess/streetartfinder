//Initialize Angular Module
var app = angular.module('art-app',[]);

app.controller('MainCtrl', function($scope, Art){
	//Create dropdown list of cities
	$scope.cities = [
		{name: 'Toronto', value: 'torontostreetart'},
		{name: 'Montreal', value: 'montrealstreetart'},
		{name: 'Vancouver', value: 'vancouverstreetart'},
		{name: 'Halifax', value: 'halifaxstreetart'}
	];

	//Get value of selected city to pass into request URL
	$scope.getCityData = function(city){
		//Store value of selected city into a variable
		cityURL = city.value;

		//Get results for the selected city
		Art.getArt(city).then(function(result){
			$scope.art = result.data;
		});
	};
});

//Factory for getting street art
app.factory('Art', function($http, $q){
	var clientId = '07f8e05b591f4014a3730fc6e1949c94';
    apiUrlFront = 'https://api.instagram.com/v1/tags/';
    apiURLBack = '/media/recent?client_id=' + clientId;
    var config = { params: {count: 33, callback: "JSON_CALLBACK"} };
    //Return object
    return {
    	getArt: function() {
			//Use a defered object to see if request is ready
			var def = $q.defer();
			//Make the request
			$http.jsonp(apiUrlFront + cityURL + apiURLBack, config)
				//If it is successful resolve the def
				.success(def.resolve)
				//If not reject it
				.error(def.reject);
			//Return the promise
			return def.promise;
		}
    }
});


