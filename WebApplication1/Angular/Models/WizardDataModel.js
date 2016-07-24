
(function (mts) {
	var wizardDataModelPage1 = function () {

		var self = this;
		self.firstName = '...';
		self.lastName = '';
		
		self.initialized = null;
	}
	mts.WizardDataModelPage1 = wizardDataModelPage1;
}(window.MyTestSite));

(function (mts) {
	var wizardDataModelPage2 = function () {

		var self = this;
		self.street = '';
		self.city = '';
		self.zip = '';

		self.initialized = null;
	}
	mts.WizardDataModelPage2 = wizardDataModelPage2;
}(window.MyTestSite));

(function (mts) {
	var wizardDataModelPage3 = function () {

		var self = this;
		self.email = '';
		self.password = '';
		self.passwordConfirm = '';
		self.initialized = null;
	}
	mts.WizardDataModelPage3 = wizardDataModelPage3;
}(window.MyTestSite));