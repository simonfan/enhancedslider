require.config({
	urlArgs: "bust=" + Math.random(),
	baseUrl: '',
	paths: {
		// basic libraries
		'jquery': 'components/jquery/jquery',
		'underscore': 'components/underscore/underscore',
		'backbone': 'components/backbone/backbone',

		'buildable': 'components/buildable/buildable',
		'_.mixins': 'components/_.mixins/_.mixins',

		// the module files go here
		'enhancedslider': '../enhancedslider',

		// jquery-ui-slider depends on:
		// jquery.ui.core.js
		// jquery.ui.mouse.js
		// jquery.ui.widget.js
		'jquery.ui.slider': 'components/jquery-ui/ui/jquery.ui.slider',
		'jquery.ui.core': 'components/jquery-ui/ui/jquery.ui.core',
		'jquery.ui.mouse': 'components/jquery-ui/ui/jquery.ui.mouse',
		'jquery.ui.widget': 'components/jquery-ui/ui/jquery.ui.widget',

		// DEMO
		'demo-main': 'demo',	// the main file for the demo

		// UNIT TESTS
		'tests-main': 'tests',	// the main file for tests

		// other tests go here
		'example-tests': 'tests/example-tests',
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		'jquery.ui.core': {
			deps: ['jquery']
		},
		'jquery.ui.widget': {
			deps: ['jquery','jquery.ui.core']
		},
		'jquery.ui.mouse': {
			deps: ['jquery','jquery.ui.core','jquery.ui.widget']
		},
		'jquery.ui.slider': {
			deps: ['jquery','jquery.ui.core','jquery.ui.widget','jquery.ui.mouse']
		},

	}
});
	
if (window.__unit) {

	// load the tests
	require(['tests-main'], function(undef) {

		// tests were already run in the main tests file

		// QUnit was set not to autostart inline in tests.html
		// finally start the QUnit engine.
		QUnit.load();
		QUnit.start();
	});

} else {

	require(['demo-main'], function(demo) {

	});

}