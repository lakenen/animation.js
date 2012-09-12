function Canvas(canvas) {
	this.canvas = canvas;
	this.width = canvas.width;
	this.height = canvas.height;
	this.ctx = canvas.getContext('2d');
	this.objects = [];
	this.loop();
}

Canvas.prototype.loop = function () {
	this.render();
	requestAnimationFrame(this.loop.bind(this));
};

Canvas.prototype.render = function () {
	var i = 0, l = this.objects.length;
	this.ctx.clearRect(0, 0, this.width, this.height);
	for (; i < l; ++i) {
		this.ctx.save();
		this.objects[i].render(this.ctx);
		this.ctx.restore();
	}
};

Canvas.prototype.add = function (obj) {
	obj.index = this.objects.length;
	this.objects.push(obj);
};
Canvas.prototype.remove = function (obj) {
	this.objects.splice(obj.index, 1);
};

function CanvasObject() {
	this.x = 0;
	this.y = 0;
	this.color = 'rgb(0,0,0)';
}

CanvasObject.prototype.render = function (ctx) {};

function Dot(r) {
	this.radius = r;
}

Dot.prototype = new CanvasObject();

Dot.prototype.render = function (ctx) {
	ctx.fillStyle = this.color;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true); 
	ctx.closePath();
	ctx.fill();
};