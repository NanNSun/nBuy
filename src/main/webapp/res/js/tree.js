// 获取某节点的全部级联子节点，返回子节点列表
function getChildren($tree, node) {
	var subNodes = $tree.tree('getChildren', node.target);
	return subNodes;
}

//获取某节点的全部级联子节点，返回子节点列表
function getLeafChildrenNum($tree, node) {
	if ($tree.tree('isLeaf', node.target)) {
		return 1;
	}
	
	var subNodes = getChildren($tree, node);
	var num = 0;
	$(subNodes).each(function() {
		if ($tree.tree('isLeaf', this.target)) {
			num++;
		}
	})
	return num;
}

//获取某节点的全部级联子节点，返回子节点列表
function getAllChildren($tree) {
	return getChildren($tree, $tree.tree('getRoot'));
}

function getLevel(node){
	var level = $(node.target).parentsUntil("ul.tree", "ul");
	return level.length + 1;
}

//获取树的深度，返回树深度整数
function getLevels($tree) {
	var subNodes = getAllChildren($tree);
	var level = 1;
	$(subNodes).each(function() {
		var tempLevel = getLevel(this);
		if (tempLevel > level) {
			level = tempLevel;
		}
		
		this.leaf = getLeafChildrenNum($tree, this);
	})
	return level;
}

// 获取某节点的下一级节点，返回子节点列表
function getSubChildren($tree, node) {
	var subNodes = [];
	if(node==null){
		subNodes = $tree.tree('getRoots');
	}else{
		$(node.target).next().children().children("div.tree-node").each(function() {
			subNodes.push($tree.tree('getNode', this));
		});
	}	
	return subNodes;
}

// 添加节点，返回添加节点信息，并将添加节点置为选中状态
function appendNode($tree, pnode, id, name) {
	var cnodes = getSubChildren($tree, pnode);
	$tree.tree('append', {
		parent : (pnode ? pnode.target : null),
		data : [ {
			id : id,
			pid : pnode.id,
			text : name,
			orderNumber : cnodes.length + 1
		} ]
	});
	var node = $tree.tree('find', id);
	$tree.tree('select', node.target);
	return node;
}

// 删除选中节点
function removeSelectedNode($tree) {
	var node = $tree.tree('getSelected');
	$tree.tree('remove', node.target);
}

// 删除指定节点
function removeNode($tree, node) {
	$tree.tree('remove', node.target);
}

function getRemoveNodes($tree, node) {
	var arrayObj = [];
	var obj = {};
	obj.id = node.id;
	arrayObj.push(obj);
	var cnodes = getChildren($tree, node);
	$(cnodes).each(function() {
		var obj = {};
		obj.id = this.id;
		arrayObj.push(obj);
	});
	return arrayObj;
}

function getDropNodes($tree, pnode, node) {
	var arrayObj = [];
	var nodes = getSubChildren($tree, pnode);
	var count = 1;
	$(nodes).each(function() {
		if (typeof node != 'undefined' && this.id == node.id) {
			return true;
		}
		if (this.orderNumber != count || this.pid != pnode.id) {
			var obj = {};
			obj.id = this.id;
			obj.pid = pnode.id;
			obj.orderNumber = count;
			arrayObj.push(obj);
		}
		count++;
	});
	return arrayObj;
}

// 移动节点，返回所影响节点更新信息列表
function treeDrop($tree, target, source, point) {
	var arrayObj = [];
	var targetpid = (point == 'append') ? target.id : target.pid;
	var sourcepid = source.pid;
	var tpnode = $tree.tree('find', targetpid);
	arrayObj = arrayObj.concat(getDropNodes($tree, tpnode));
	if (targetpid != sourcepid || point == 'append') {
		var spnode = $tree.tree('find', sourcepid);
		arrayObj = arrayObj.concat(getDropNodes($tree, spnode));
	}
	return arrayObj;
}