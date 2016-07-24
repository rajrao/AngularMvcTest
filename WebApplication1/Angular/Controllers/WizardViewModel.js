var wizardRegisterViewModel = angular.module("wizard", ["common"])
.config(function ($routeProvider, $locationProvider) {
	$routeProvider.when(window.MyTestSite.rootPath + 'mytest/wizard/register/step1',
		{ templateUrl: window.MyTestSite.rootPath + 'Angular/Templates/WizardPage1.html', controller: 'WizardPage1ViewModel' });
	$routeProvider.when(window.MyTestSite.rootPath + 'mytest/wizard/register/step2',
		{ templateUrl: window.MyTestSite.rootPath + 'Angular/Templates/WizardPage2.html', controller: 'WizardPage2ViewModel' });
	$routeProvider.when(window.MyTestSite.rootPath + 'mytest/wizard/register/step3',
		{ templateUrl: window.MyTestSite.rootPath + 'Angular/Templates/WizardPage3.html', controller: 'WizardPage3ViewModel' });
	$routeProvider.when(window.MyTestSite.rootPath + 'mytest/wizard/register/confirm',
		{ templateUrl: window.MyTestSite.rootPath + 'Angular/Templates/WizardConfirm.html', controller: 'WizardConfirmViewModel' });
	$routeProvider.otherwise({ redirectTo: window.MyTestSite.rootPath + 'mytest/wizard/register/step1' });
	$locationProvider.html5Mode(true);
});

wizardRegisterViewModel.controller("WizardViewModel", function ($scope, $http, $location, $window, viewModelHelper, validator) {

	$scope.viewModelHelper = viewModelHelper;
	$scope.wizardDataModelPage1 = new window.MyTestSite.WizardDataModelPage1();
	$scope.wizardDataModelPage2 = new window.MyTestSite.WizardDataModelPage2();
	$scope.wizardDataModelPage3 = new window.MyTestSite.WizardDataModelPage3();

	$scope.previous = function() {
		$window.history.back();
	}
});

wizardRegisterViewModel.controller("WizardPage1ViewModel", function ($scope, $http, $location, viewModelHelper, validator) {

	viewModelHelper.modelIsValid = true;
	viewModelHelper.modelErrors = [];

	var page1Rules = [];

	var setupRules = function () {
		page1Rules.push(new validator.PropertyRule("firstName", {
			required: { message: "First name is required" }
		}));
		page1Rules.push(new validator.PropertyRule("lastName", {
			required: { message: "Last name is required" }
		}));
	}

	$scope.step2 = function () {
		validator.ValidateModel($scope.wizardDataModelPage1, page1Rules);
		viewModelHelper.modelIsValid = $scope.wizardDataModelPage1.isValid;
		viewModelHelper.modelErrors = $scope.wizardDataModelPage1.errors;
		if (viewModelHelper.modelIsValid) {
			viewModelHelper.apiPost('api/wizard/register/validate', $scope.wizardDataModelPage1,
                function (result) {
                	$scope.wizardDataModelPage1.initialized = true;
                	$location.path(window.MyTestSite.rootPath + 'mytest/wizard/register/step2');
                });
		}
		else
			viewModelHelper.modelErrors = $scope.wizardDataModelPage1.errors;
	}

	setupRules();
});

wizardRegisterViewModel.controller("WizardPage2ViewModel", function ($scope, $http, $location, viewModelHelper, validator) {

	if (!$scope.wizardDataModelPage1.initialized) {
		// got to this controller before going through step 1
		$location.path(window.myTestSite.rootPath + 'mytest/wizard/register/step1');
	}

	viewModelHelper.modelIsValid = true;
	viewModelHelper.modelErrors = [];

	var page2Rules = [];

	var setupRules = function () {
		page2Rules.push(new validator.PropertyRule("street", {
			required: { message: "street is required" }
		}));
		page2Rules.push(new validator.PropertyRule("city", {
			required: { message: "City is required" }
		}));
		page2Rules.push(new validator.PropertyRule("zip", {
			required: { message: "Zip code is required" },
			pattern: { message: "Zip code is in invalid format", params: /^\d{5}$/ }
		}));
	}

	$scope.step3 = function () {
		validator.ValidateModel($scope.wizardDataModelPage2, page2Rules);
		viewModelHelper.modelIsValid = $scope.wizardDataModelPage2.isValid;
		viewModelHelper.modelErrors = $scope.wizardDataModelPage2.errors;
		if (viewModelHelper.modelIsValid) {
			viewModelHelper.apiPost('api/wizard/register/validate', $scope.wizardDataModelPage2,
                function (result) {
                	$scope.wizardDataModelPage2.initialized = true;
                	$location.path(window.MyTestSite.rootPath + 'mytest/wizard/register/step3');
                });
		}
		else
			viewModelHelper.modelErrors = $scope.wizardDataModelPage2.errors;
	}

	setupRules();
});

wizardRegisterViewModel.controller("WizardPage3ViewModel", function ($scope, $http, $location, viewModelHelper, validator) {

	if (!$scope.wizardDataModelPage2.initialized) {
		// got to this controller before going through step 2
		$location.path(window.MyTestSite.rootPath + 'mytest/wizard/register/step2');
	}

	var page3Rules = [];

	var setupRules = function () {
		page3Rules.push(new validator.PropertyRule("email", {
			required: { message: "Email is required" }
		}));
		page3Rules.push(new validator.PropertyRule("password", {
			required: { message: "Password is required" },
			minLength: { message: "Password must be at least 6 characters", params: 6 }
		}));
		page3Rules.push(new validator.PropertyRule("passwordConfirm", {
			required: { message: "Password confirmation is required" },
			custom: {
				validator: window.MyTestSite.mustEqual,
				message: "Password do not match",
				params: function () { return $scope.wizardDataModelPage3.password; } // must be function so it can be obtained on-demand
			}
		}));
	}

	$scope.confirm = function () {
		validator.ValidateModel($scope.wizardDataModelPage3, page3Rules);
		viewModelHelper.modelIsValid = $scope.wizardDataModelPage3.isValid;
		viewModelHelper.modelErrors = $scope.wizardDataModelPage3.errors;
		if (viewModelHelper.modelIsValid) {
			viewModelHelper.apiPost('api/wizard/register/validate', $scope.wizardDataModelPage3,
                function (result) {
                	$scope.wizardDataModelPage3.initialized = true;
                	$location.path(window.MyTestSite.rootPath + 'mytest/wizard/register/confirm');
                });
		}
		else
			viewModelHelper.modelErrors = $scope.wizardDataModelPage3.errors;
	}

	setupRules();
});

wizardRegisterViewModel.controller("WizardConfirmViewModel", function ($scope, $http, $location, $window, viewModelHelper) {

	if (!$scope.wizardDataModelPage3.initialized) {
		// got to this controller before going through step 3
		$location.path(window.MyTestSite.rootPath + 'mytest/wizard/register/step3');
	}

	$scope.submitWizardData = function () {

		var wizardModel = {};

		wizardModel = $.extend(wizardModel, $scope.wizardDataModelPage1);
		wizardModel = $.extend(wizardModel, $scope.wizardDataModelPage2);
		wizardModel = $.extend(wizardModel, $scope.wizardDataModelPage3);

		viewModelHelper.apiPost('api/wizard/register/complete', wizardModel,
            function (result) {
            	$window.location.href = window.MyTestSite.rootPath;
            });
	}
});
