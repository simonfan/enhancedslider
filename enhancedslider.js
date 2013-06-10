define(['jquery','jquery.ui.slider','buildable','backbone','underscore','_.mixins'],
function(   $   , undef            , Buildable , Backbone , undef      , undef    ) {

	var Enhanced = Object.create(Buildable);
	Enhanced.extend(Backbone.Events, {
		init: function(data) {
			_.interface({
				id: 'Enhanced slider',
				obj: data,
				typeofs: {
					$el: 'object',
					$output: ['object', 'undefined'],
					outputProcessor: ['function', 'undefined'],
				}
			});

			_.bindAll(this);

			// slider $el
			this.$el = data.$el;

			// output processor
			this.outputProcessor = data.outputProcessor;

			// slider options
			this.options = data || {};

			// set events
			this._setupEvents();
			this._proxyEvents(['slidechange','slidecreate','slide','slidestart','slidestop']);
		},

		_setupEvents: function() {
		//	this.$el.on('slidechange', this._slidechange);
		//	this.$el.on('slidestart', this._slidestart);
		//	this.$el.on('slidestop', this._slidestop);
			this.$el.on('slide', this._slide);
		},

		_slide: function(e, ui) {
			// if there are two handles, then use ui.values.
			// otherwise, use ui.value.
			if (this.handles) {
				this._output(ui.values)
			} else {
				this._output(ui.value);
			}
		},

		_proxyEvents: function(eventNames) {
			var _this = this;
			_.each(eventNames, function(event, index) {
				_this.$el.on(event, function() {

					var args = _.args(arguments);

					args.unshift(event);

					_this.trigger.apply(_this, args);
				});
			});	
		},
	})

	// SINGLE
	var EnhancedSingle = Object.create(Enhanced);
	EnhancedSingle.extend({
		init: function(data) {
			_.interface({
				id: 'Enhanced SINGLE slider initialization',
				obj: data,
				typeofs: {
					handle: ['object', 'undefined'],		// initialvalue, $output
					initialvalue: ['number', 'undefined'],
				}
			});

			this.handle = data.handle;
			this.initialvalue = data.handle ? data.handle.initialvalue || data.initialvalue : data.initialvalue;

			// output might be on the handle or directly on the options hash
			this.$output = data.handle ? data.handle.$output || data.$output : data.$output;

			this._build();
		},

		_build: function() {
			this.options.value = this.initialvalue;
			this.slider = this.$el.slider(this.options);
		},

		_output: function(val) {

			if (this.$output) {
				var outputVal = this.outputProcessor ? this.outputProcessor(val) : val;

				this.$output.html(outputVal);
			}

		}
	});

	// RANGE
	var EnhancedRange = Object.create(Enhanced);
	EnhancedRange.extend({
		init: function(data) {
			_.interface({
				id: 'Enhanced RANGE slider initialization',
				obj: data,
				typeofs: {
					handles: 'object',		// initialvalue, $output
				}
			});

			this.handles = data.handles;

			// output might be on the handle or directly on the options hash
			this.$output = (data.handles[0].$output && data.handles[1].$output) ? [data.handles[0].$output, data.handles[1].$output] : data.$output;

			this._build();
		},

		_build: function() {
			this.options.values = [this.handles[0].initialvalue, this.handles[1].initialvalue];
			this.options.range = true;
			this.slider = this.$el.slider(this.options);
		},

		_output: function(vals) {
			console.log(vals);
			var outputVal = this.outputProcessor ? this.outputProcessor(vals) : vals;

			if ( _.isArray(this.$output) ) {

				if ( _.isArray(outputVal) ) {
					this.$output[0].html(outputVal[0]);
					this.$output[1].html(outputVal[1]);
				} else {
					throw new Error('Output value is not an array and we need to supply outputs for two output elements. Please review the outputprocessor.')
				}

			} else if ( this.$output ) {

				this.$output.html(outputVal);
			}

		}
	});

	$.fn.enhancedslider = function(data) {
		data.$el = this;
		return data.handles ? EnhancedRange.build(data) : EnhancedSingle.build(data);
	};

	return undefined;
});