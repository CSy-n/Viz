var ArcIcon = function(node1, node2) {
    this.node1 = node1;
    this.node2 = node2;
}

ArcIcon.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.node1.x, this.node1.y);
    ctx.lineTo(this.node2.x, this.node2.y);
    ctx.stroke();
}

