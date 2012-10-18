// defining the new animation class
var Rotate = Animation.extend(function (elt, options) {
	this._super(options);
	var transform = getTransform(elt);
	var oldX = transform[4];
	var oldY = transform[5];
	var oldA = getRotationDegrees(transform);
	return {
		update: function (pos) {
			var newX = (((options.x - oldX) * pos) + oldX).toFixed(8);
			var newY = (((options.y - oldY) * pos) + oldY).toFixed(8);
			var newA = (((options.a - oldA) * pos) + oldA).toFixed(8);
			setTransform(elt, newX, newY, newA);
		}
	}
});

// some helper functions
function getRotationDegrees(transform) {
	var a = transform[0],
		b = transform[1],
		rad = Math.atan2(b, a),
		deg = 180 * rad / Math.PI;
	if (deg < 0) 
		deg += 360;
	return deg;
}

var vendors = ['webkit', 'moz', 'ms', 'o'];
function setTransform(element, x, y, a) {
	for(var i = 0; i < vendors.length; ++i)
		element.style['-'+vendors[i]+'-transform'] = 'translate('+x+'px, '+y+'px) rotate('+a+'deg)';
}

function getTransform(element) {
	var style = window.getComputedStyle(element),
		str = '';

	for(var i = 0; i < vendors.length && !str; ++i)
		str = style['-'+vendors[i]+'-transform'];

	if (!str || str == 'none')
		return [0,0,0,0,0,0];

	var splits = str.substr(7).split(',');
	for (i = 0; i < splits.length; ++i)
		splits[i] = parseFloat(splits[i]);

	return splits;
}