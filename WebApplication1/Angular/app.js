
var commonModule = angular.module('common', ['ngRoute', 'ui.bootstrap']);

// Non-SPA views will use Angular controllers created on the appMainModule.
var appMainModule = angular.module('appMain', ['common']);

// SPA-views will attach to their own module and use their own data-ng-app and nested controllers.
// Each MVC-delivered top-spa-level view will link its needed JS files.

// Services attached to the commonModule will be available to all other Angular modules.

commonModule.factory('viewModelHelper', function ($http, $q) {
	return window.MyTestSite.viewModelHelper($http, $q);
});

commonModule.factory('validator', function () {
	return valJs.validator();
});

(function (mts) {
	var viewModelHelper = function ($http, $q) {

		var self = this;

		self.modelIsValid = true;
		self.modelErrors = [];
		self.isLoading = false;

		self.apiGet = function (uri, data, success, failure, always) {
			self.isLoading = true;
			self.modelIsValid = true;
			$http.get(CarRental.rootPath + uri, data)
                .then(function (result) {
                	success(result);
                	if (always != null)
                		always();
                	self.isLoading = false;
                }, function (result) {
                	if (failure == null) {
                		if (result.status != 400)
                			self.modelErrors = [result.status + ':' + result.statusText + ' - ' + result.data.Message];
                		else
                			self.modelErrors = [result.data.Message];
                		self.modelIsValid = false;
                	}
                	else
                		failure(result);
                	if (always != null)
                		always();
                	self.isLoading = false;
                });
		}

		self.apiPost = function (uri, data, success, failure, always) {
			self.isLoading = true;
			self.modelIsValid = true;
			$http.post(MyTestSite.rootPath + uri, data)
                .then(function (result) {
                	success(result);
                	if (always != null)
                		always();
                	self.isLoading = false;
                }, function (result) {
                	if (failure == null) {
                		if (result.status != 400)
                			self.modelErrors = [result.status + ':' + result.statusText + ' - ' + result.data.Message];
                		else
                			self.modelErrors = [result.data.Message];
                		self.modelIsValid = false;
                	}
                	else
                		failure(result);
                	if (always != null)
                		always();
                	isLoading = false;
                });
		}

		return this;
	}
	mts.viewModelHelper = viewModelHelper;
}(window.MyTestSite));

(function (mts) {
	var mustEqual = function (value, other) {
		return value == other;
	}
	mts.mustEqual = mustEqual;
}(window.MyTestSite));


