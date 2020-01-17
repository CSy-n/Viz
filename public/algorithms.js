function setDifference(a, b) {
	var diff = new Set();
	for(var el of a) {
		if(!b.has(el)) {
			diff.add(el);
		}
	}
	return diff;
}

function dfs(g, canvas, root) {
	var nodeStack = [];

	nodeStack.push(root);
	var explored = new Set();
	var expansion = 0;

	while(nodeStack.length != 0) {
		var node = nodeStack.pop();
		if(explored.has(node)) {
			continue;
		}
		canvas.getNode(node).setAnnotation(""+expansion);

		explored.add(node);
		var children = setDifference(g.getAdjacentNodes(node), explored);
		for(var child of children) {
			nodeStack.push(child);
		}
		expansion++;
	}
}


function bfs(g, canvas, root) {
	var nodeQueue = [];

	nodeQueue.push(root);
	var explored = new Set();
	var expansion = 0;

	while(nodeQueue.length != 0) {
		var node = nodeQueue.shift();
		if(explored.has(node)) {
			continue;
		}
		canvas.getNode(node).setAnnotation(""+expansion);

		explored.add(node);
		var children = setDifference(g.getAdjacentNodes(node), explored);
		for(var child of children) {
			nodeQueue.push(child);
		}
		expansion++;
	}
}



