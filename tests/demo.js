define(['jquery','enhancedslider'], function($, undef) {
	window.single = $('#slider').enhancedslider({
		min: 5,
		max: 10,
		initialvalue: 7,
		$output: $('#single-output'),
		outputProcessor: function(val) {
			return 'kg ' + val;
		}
	});

	window.range = $('#range').enhancedslider({
		min: 0,
		max: 16,
		$output: $('#range-output'),
		outputProcessor: function(vals) {
			return [ 'R$' + vals[0], 'R$' + vals[1] ];
		},
		handles: [{
			initialvalue: 5,
			$output: $('#range-output-1')
		}, {
			initialvalue: 14,
			$output: $('#range-output-2')
		}]

	});
});