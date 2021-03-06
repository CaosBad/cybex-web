var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*
https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/bollingerBands.js

The MIT License (MIT)

Copyright (c) 2014-2015 Scott Logic Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

import { mean, deviation } from "d3-array";

import ema from "./ema";
import { last, slidingWindow, zipper, path } from "../utils";

import { BollingerBand as defaultOptions } from "./defaultOptionsForComputation";

export default function () {
	var options = defaultOptions;

	function calculator(data) {
		var _options = options,
		    windowSize = _options.windowSize,
		    multiplier = _options.multiplier,
		    movingAverageType = _options.movingAverageType,
		    sourcePath = _options.sourcePath;


		var source = path(sourcePath);
		var meanAlgorithm = movingAverageType === "ema" ? ema().options({ windowSize: windowSize, sourcePath: sourcePath }) : slidingWindow().windowSize(windowSize).accumulator(function (values) {
			return mean(values);
		}).sourcePath(sourcePath);

		var bollingerBandAlgorithm = slidingWindow().windowSize(windowSize).accumulator(function (values) {
			var avg = last(values).mean;
			var stdDev = deviation(values, function (each) {
				return source(each.datum);
			});
			return {
				top: avg + multiplier * stdDev,
				middle: avg,
				bottom: avg - multiplier * stdDev
			};
		});

		var zip = zipper().combine(function (datum, mean) {
			return { datum: datum, mean: mean };
		});

		var tuples = zip(data, meanAlgorithm(data));
		return bollingerBandAlgorithm(tuples);
	}
	calculator.undefinedLength = function () {
		var _options2 = options,
		    windowSize = _options2.windowSize;

		return windowSize - 1;
	};
	calculator.options = function (x) {
		if (!arguments.length) {
			return options;
		}
		options = _extends({}, defaultOptions, x);
		return calculator;
	};

	return calculator;
}
//# sourceMappingURL=bollingerband.js.map