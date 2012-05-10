// defining the new animation class
var Colors = Animation.extend(function (elt, options) {
	this._super(options);
	var oldColor = getRGB(elt);
	var newColor = getRGB(options.to);
	var floor = Math.floor;
	return {
		update: function (pos) {
			elt.style.backgroundColor = 'rgb('+
						floor(((newColor[0] - oldColor[0]) * pos) + oldColor[0]) + ',' +
						floor(((newColor[1] - oldColor[1]) * pos) + oldColor[1]) + ',' +
						floor(((newColor[2] - oldColor[2]) * pos) + oldColor[2]) + ')';
		}
	}
});

function getRGB(elt) {
	var rgbStr = typeof elt === 'string' ? elt : getComputedStyle(elt).backgroundColor,
		matches = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.exec(rgbStr);
	return matches && 
		[parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])] || 
		[255,255,255];
}