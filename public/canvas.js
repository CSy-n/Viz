var Canvas = function() {
    this.g = new UndirectedGraph();
    this.nodes = new Set();
    this.arcs = new Set();
    this.dragging = null;
    this.canvasCSS = "#canvas";
}

Canvas.prototype.getNode = function(nodeName) {
    for(var node of this.nodes) {
        if(node.name == nodeName) {
            return node;
        }
    }
    return null;
}

Canvas.prototype.addNewNode = function(nodeName) {
    var x = Math.floor(Math.random()*300 + 50);
    var y = Math.floor(Math.random()*300 + 50);

    console.log("x: " + x + " y: " + y);

    this.nodes.add( new NodeIcon(x, y, nodeName) );
    this.draw();
}

Canvas.prototype.removeNewNode = function(nodeName) {
    var toRemove = null;
    for(var node of this.nodes) {
        if(node.name == nodeName) {
            toRemove = node;
            break;
        }
    }
    if(toRemove != null) {
        this.nodes.delete(toRemove);
        for(var arc of this.arcs) {
            if(arc.node1.name == nodeName || arc.node2.name == nodeName) {
                this.arcs.delete(arc);
            }
        }
        this.draw();
    }
}

Canvas.prototype.addNewArc = function(nodeName1, nodeName2) {
    var node1 = null;
    var node2 = null;
    for(var currNode of this.nodes) {
        if(currNode.name == nodeName1) {
            node1 = currNode;
        } else if(currNode.name == nodeName2) {
            node2 = currNode;
        }
    }
    if(node1 !== null && node2 !== null) {
        this.arcs.add( new ArcIcon(node1, node2) );
        this.draw();
    }
}

Canvas.prototype.removeNewArc = function(nodeName1, nodeName2) {
    for(var currArc of this.arcs) {
        if(currArc.node1.name == nodeName1 &&
           currArc.node2.name == nodeName2) {
            this.arcs.delete(currArc);
            this.draw();
        }
    }
}

Canvas.prototype.clearAnnotations = function() {
    for(var node of this.nodes) {
        node.setAnnotation("");
    }
    this.draw();
}

Canvas.prototype.getContext = function() {
    return $(this.canvasCSS)[0].getContext("2d");
}

Canvas.prototype.clear = function() {
    this.getContext().clearRect(0, 0, $(this.canvasCSS)[0].width, $(this.canvasCSS)[0].height);
}

Canvas.prototype.draw = function() {
    this.clear();
    
    var ctx = this.getContext();
    for(var arc of this.arcs) {
        arc.draw(ctx);
    }
    for(var node of this.nodes) {
        node.draw(ctx);
    }
}

Canvas.prototype.mousedown = function(event) {
    for(var node of this.nodes) {
        var offsx = $(this.canvasCSS).offset().left;
        var offsy = $(this.canvasCSS).offset().top;
        if(node.isInBounds(event.pageX-offsx, event.pageY-offsy)) {
            this.dragging = node;
            return;
        }
    }
    this.dragging = null;
}

Canvas.prototype.mouseup = function(event) {
    this.dragging = null;
}

Canvas.prototype.mousemove = function(event) {
    if(this.dragging !== null) {
        var node = this.dragging;
        var offsx = $(this.canvasCSS).offset().left;
        var offsy = $(this.canvasCSS).offset().top;
        node.x = event.pageX - offsx;
        node.y = event.pageY - offsy;
        this.draw();
    }
}

