/**
 * Get the base64 image data
 * corruptor function
 *
 * @param options
 * @returns {Function}
 */
export function getCorrupt64(options = {}) {
	const {maxErrors, margin, limiter} = Object.assign({
		maxErrors: 100,
		margin: 2200,
		limiter: 0.7
	}, options);

	/**
	 * The base64 image data corruptor
	 * function
	 *
	 * @param data
	 * @returns string
	 */
	return function corrupt64(data) {
		if (Math.random() > limiter) {
			let errors = Math.round(Math.random() * maxErrors);
			while (errors--) {
				const p = margin + Math.round(Math.random() * (data.length - margin - 1));
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
export default function imgGlitch(img, options) {
	const imgElement = 'string' === typeof img
		? document.querySelector(img)
		: img;

	if (!(imgElement instanceof HTMLImageElement && imgElement.constructor === HTMLImageElement)) {
		throw new TypeError('renderImgCorruption expects input img to be a valid image element');
	}

	const corrupt64 = getCorrupt64(options);
	const data = imgElement.src;

	let corruption;

	return {
		start,
		stop,
		clear
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
