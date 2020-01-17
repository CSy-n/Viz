var UndirectedGraph = function() {
    this.nodes = new Set();
    this.arcs = new Object();
    this.canvases = [];
}

UndirectedGraph.prototype.addNode = function(nodeName) {
    if(!this.nodes.has(nodeName)) {
        this.nodes.add(nodeName);
        this.arcs[nodeName] = new Set();
        this.notifyNodeAdded(nodeName);
    }
}

UndirectedGraph.prototype.removeNode = function(nodeName) {
    if(this.nodes.delete(nodeName)) {
        this.arcs[nodeName] = new Set();
        for(arc in this.arcs) {
            this.arcs[arc].delete(nodeName);
        }
        this.notifyNodeRemoved(nodeName);
    }
}

UndirectedGraph.prototype.addArc = function(nodeName1, nodeName2) {
    if(!this.arcs.hasOwnProperty(nodeName1) ||
       !this.arcs.hasOwnProperty(nodeName2)) {
           return;
    }
    if(this.arcs[nodeName1].has(nodeName2)) return;
    if(this.arcs[nodeName2].has(nodeName1)) return;

    this.arcs[nodeName1].add(nodeName2);
    this.arcs[nodeName2].add(nodeName1);
    this.notifyArcAdded(nodeName1, nodeName2);
}

UndirectedGraph.prototype.removeArc = function(nodeName1, nodeName2) {
    var removed = false;
    removed |= this.arcs[nodeName1].delete(nodeName2);
    removed |= this.arcs[nodeName2].delete(nodeName1);
    if(removed) {
        this.notifyArcRemoved(nodeName1, nodeName2);
    }
}

UndirectedGraph.prototype.getAdjacentNodes = function(nodeName) {
    return this.arcs[nodeName];
}

UndirectedGraph.prototype.display = function() { 
    this.nodes.forEach(function(value) {
        console.log(value);
    });
    for(var key in this.arcs) {
        console.log(key + ": " + this.arcs[key]);
    }
}

UndirectedGraph.prototype.notifyNodeAdded = function(nodeName) {
    for(i=0; i<this.canvases.length; i++) {
        this.canvases[i].addNewNode(nodeName);
    }
}

UndirectedGraph.prototype.notifyNodeRemoved = function(nodeName) {
    for(i=0; i<this.canvases.length; i++) {
        this.canvases[i].removeNewNode(nodeName);
    }
}

UndirectedGraph.prototype.notifyArcAdded = function(nodeName1, nodeName2) {
    for(i=0; i<this.canvases.length; i++) {
        this.canvases[i].addNewArc(nodeName1, nodeName2);
    }
}

UndirectedGraph.prototype.notifyArcRemoved = function(nodeName1, nodeName2) {
    for(i=0; i<this.canvases.length; i++) {
        this.canvases[i].removeNewArc(nodeName1, nodeName2);
    }
}

UndirectedGraph.prototype.addCanvas = function(canvas) {
    this.canvases.push(canvas);
}

