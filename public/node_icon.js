var NodeIcon = function(x, y, name) {
    this.x = x;
    this.y = y;
    this.r = 25;
    this.name = name;
    this.annotation = "";
}

NodeIcon.prototype.moveTo = function(x, y) {
    this.x = x;
    this.y = y;
}

NodeIcon.prototype.setAnnotation = function(annotation) {
    this.annotation = annotation;
}

NodeIcon.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fillStyle="#FF0000";
    ctx.fill();
    
    ctx.fillStyle="#000000";
    ctx.font="30px Verdana";
    ctx.fillText(this.name, this.x-this.r/2, this.y+this.r/2);

    ctx.fillStyle="#0000FF";
    ctx.font="20px Verdana";
    ctx.fillText(this.annotation, this.x-this.r, this.y+3*this.r/2);
}

NodeIcon.prototype.isInBounds = function(mouseX, mouseY) {
    var dx = (mouseX - this.x);
    var dy = (mouseY - this.y);
    
    return (dx*dx + dy*dy) < (this.r*this.r);
}
