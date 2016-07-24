
appMainModule.controller("MyTestTestViewModel", function ($scope, $http, $location, viewModelHelper, validator) {

	$scope.viewModelHelper = viewModelHelper;
	$scope.myTestDataModel = new window.MyTestSite.MyTestTestDataModel();
	
	var myTestDataModelRules = [];

	var setupRules = function () {
		myTestDataModelRules.push(new validator.PropertyRule("myName", {
			required: { message: "Name is required" }
		}));
		myTestDataModelRules.push(new validator.PropertyRule("someMoreStringData", {
			required: { message: "someMoreStringData is required" },
			minLength: { message: "someMoreStringData must be at least 6 characters", params: 6 }
		}));
	}

	$scope.doWork = function () {
		validator.ValidateModel($scope.myTestDataModel, myTestDataModelRules);
		viewModelHelper.modelIsValid = $scope.myTestDataModel.isValid;
		viewModelHelper.modelErrors = $scope.myTestDataModel.errors;
		if (viewModelHelper.modelIsValid) {
			viewModelHelper.apiPost('api/myTestData/DoSomeWork', $scope.myTestDataModel, function (result) {
				$scope.myTestDataModel.result = 'true';
			});
			
		} else {
			viewModelHelper.modelErrors = $scope.myTestDataModel.errors;
			$scope.myTestDataModel.result = 'false';
		}
	}

	setupRules();
});
