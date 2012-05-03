# Animation.js

A JavaScript animation library for easily creating complex, customizable animations.

## How to use

You can use Animation.Transform if you just want to animate properties on an object:
```js
var ball = {
	size: 1,
	velocity: {
		x: 0,
		y: 0
	}
};

var animation = new Animation.Transform(ball, {
	to: {
		size: 10,
		velocity: {
			x: 100,
			y: 100
		}
	},
	duration: 2.0,
	delay: 1.0,
	transition: Animation.Transitions.Exponential.easeIn,
	onFinish: function () {
		alert('done!');
	}
});
```

You can also extend Animation to animate anything you like! 
For example, the following code creates an animation that will rotate and move an HTML element on a page:
```js
// defining the new animation class
var MyAnimation = Animation.extend(function (elt, options) {
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
	for(var x = 0; x < vendors.length; ++x)
		element.style['-'+vendors[x]+'-transform'] = 'translate('+x+'px, '+y+'px) rotate('+a+'deg)';
}

function getTransform(element) {
	var style = window.getComputedStyle(element),
		str = '';

	for(var x = 0; x < vendors.length && !str; ++x)
		str = style['-'+vendors[x]+'-transform'];

	if (!str || str == 'none')
		return [0,0,0,0,0,0];

	var splits = str.substr(7).split(',');
	for (x = 0; x < splits.length; ++x)
		splits[x] = parseFloat(splits[x]);

	return splits;
}

// let's try it!
var animation = new MyAnimation(document.getElementById('square'), {
	x: 400,
	y: 200,
	a: 45, //degrees
	duration: 0.5
});

```

## Coming soon...

Tests and more examples!

## License 

(The MIT License)

Copyright 2012 Cameron Lakenen

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
