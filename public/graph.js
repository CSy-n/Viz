function getQueryVariable(variable) {
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
           var pair = vars[i].split("=");
           if(pair[0] == variable){return pair[1];}
   }
   return "";
}

function createGraphFromURL(canvas) {
    var g = new UndirectedGraph();
    g.addCanvas(canvas);

    nodes = getQueryVariable("nodes").split(";");
    for(node of nodes) {
        if(node == "") continue;
        var nodeArray = node.split(",");
        g.addNode(nodeArray[0]);
        var node = canvas.getNode(nodeArray[0]);
        node.moveTo(+nodeArray[1], +nodeArray[2]);
        node.setAnnotation(nodeArray[3]);
    }

    arcs = getQueryVariable("arcs").split(";");
    for(arc of arcs) {
        if(arc == "") continue;
        var arcArray = arc.split(",");
        g.addArc(arcArray[0], arcArray[1]);
    }

    return g;
}

function createURLFromGraph(canvas) {
    var url = location.protocol + '//' + location.host + location.pathname;
    var paramsString = "nodes=";

    for(var node of canvas.nodes) {
        console.log(node);
        paramsString += node.name + "," + node.x + "," + node.y + "," + node.annotation + ";";
    }

    paramsString += "&arcs=";
    for(var arc of canvas.arcs) {
        paramsString += arc.node1.name + "," + arc.node2.name + ";";
    }

    return url + "?" + paramsString;
}

$( document ).ready(function() {
    var canvas = new Canvas();
    var g = createGraphFromURL(canvas);
    
    canvas.draw();

    $("#canvas").mousedown(function(event) {
        canvas.mousedown(event);     
    });
    
    $("#canvas").mouseup(function(event) {
        canvas.mouseup(event);
    });
    
    $("#canvas").mousemove(function(event) {
        canvas.mousemove(event);
    });
    
    $("#addnodebutton").click(function() {
        g.addNode($("#addnodebox").val());
    });

    $("#removenodebutton").click(function() {
        g.removeNode($("#addnodebox").val());
    });

    $("#addarcbutton").click(function() {
        g.addArc($("#addarcbox1").val(), $("#addarcbox2").val());
    });

    $("#removearcbutton").click(function() {
        g.removeArc($("#addarcbox1").val(), $("#addarcbox2").val());
    });

    $("#dfsbutton").click(function() {
        dfs(g, canvas, $("#argument").val());
        canvas.draw();
    });

    $("#bfsbutton").click(function() {
        bfs(g, canvas, $("#argument").val());
        canvas.draw();
    });

    $("#clearannotations").click(function() {
        canvas.clearAnnotations();
        canvas.draw();
    });

    $("#savebutton").click(function() {
        alert(createURLFromGraph(canvas));
    });
});
