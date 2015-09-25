(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports'], factory);
	} else if (typeof exports !== 'undefined') {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.imgGlitch = mod.exports;
	}
})(this, function (exports) {
	/**
  * Get the base64 image data
  * corruptor function
  *
  * @param options
  * @returns {Function}
  */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.getCorrupt64 = getCorrupt64;
	exports['default'] = imgGlitch;

	function getCorrupt64() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var _Object$assign = Object.assign({
			maxErrors: 100,
			margin: 2200,
			limiter: 0.7
		}, options);

		var maxErrors = _Object$assign.maxErrors;
		var margin = _Object$assign.margin;
		var limiter = _Object$assign.limiter;

		/**
   * The base64 image data corruptor
   * function
   *
   * @param data
   * @returns string
   */
		return function corrupt64(data) {
			if (Math.random() > limiter) {
				var errors = Math.round(Math.random() * maxErrors);
				while (errors--) {
					var p = margin + Math.round(Math.random() * (data.length - margin - 1));
					data = data.substr(0, p) + data.charAt(p + 1) + data.charAt(p) + data.substr(p + 2);
				}
			}

			return data;
		};
	}

	/**
  * Render the base64 corruption
  * based image glitch effect
  *
  * @param img
  * @param options
  *
  * @returns {{start, stop, clear}}
  */

	function imgGlitch(img, options) {
		var imgElement = 'string' === typeof img ? document.querySelector(img) : img;

		if (!(imgElement instanceof HTMLImageElement && imgElement.constructor === HTMLImageElement)) {
			throw new TypeError('renderImgCorruption expects input img to be a valid image element');
		}

		var corrupt64 = getCorrupt64(options);
		var data = imgElement.src;

		var corruption = undefined;

		return {
			start: start,
			stop: stop,
			clear: clear
		};

		/**
   * Start rendering the
   * corruption
   *
   */
		function start() {
			corruption = requestAnimationFrame(render);
		}

		/**
   * Render the corruption
   *
   */
		function render() {
			imgElement.src = corrupt64(data);
			start();
		}

		/**
   * Stop rendering the
   * corruption
   *
   */
		function stop() {
			cancelAnimationFrame(corruption);
		}

		/**
   * Stop rendering the
   * corruption and
   * clear its effects
   *
   */
		function clear() {
			stop();
			imgElement.src = data;
		}
	}
});