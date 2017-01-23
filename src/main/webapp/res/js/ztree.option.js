//获取某节点的全部级联子节点，返回子节点列表
function getLeafChildrenNum(treeNode) {
	var num = 0;
	if (treeNode.isParent) {
		var subNodes = getAllChildren(treeNode);
		$(subNodes).each(function() {
			if (!this.isParent) {
				num++;
			}
		})
	} else {
		num = 1;
	}

	return num;
}

// 获取某节点的全部级联子节点，返回子节点列表
function getAllChildren(treeNode, result) {
	if (typeof result == 'undefined') {
		result = new Array();
	} else {
		result.push(treeNode);
	}
	if (treeNode.isParent) {
		var childrenNodes = treeNode.children;
		if (childrenNodes) {
			for (var i = 0; i < childrenNodes.length; i++) {
				getAllChildren(childrenNodes[i], result);
			}
		}
	}
	return result;
}
/**分析表 获取某节点的全部级联子节点，返回子节点列表*/
function getAllsTreesNode(treeNode,appen,result){
	if (typeof result == 'undefined') {
		result = new Array();
	} else {
		result.push(treeNode);
	}
	if (treeNode.isParent) {
		var childrenNodes = treeNode.children;
		if (childrenNodes) {
			for (var i = 0; i < childrenNodes.length; i++) {
				if(childrenNodes[i].id=='f601f2104d9244e9aa4c5cba9643b2b7'){
					for (var j = 0; j < appen; j++) {
						var newObject = jQuery.extend(true, {}, childrenNodes[i]);
						if(j==0){
							newObject.name="$m$";
							newObject.objType="1";
						}else{
							newObject.name="$m-"+j+"$";
							newObject.objType="2";
						}
						getAllsTreesNode(newObject,appen,result);
					}
				}else{
					getAllsTreesNode(childrenNodes[i],appen,result);
				}
			}
		}
	}
	return result;
}

function getLevel(node) {
	var level = $(node.target).parentsUntil("ul.tree", "ul");
	return level.length + 1;
}

// 获取树的深度，返回树深度整数
function getLevels(treeNode) {
	var subNodes = getAllChildren(treeNode);
	var level = 1;
	$(subNodes).each(function() {
		var tempLevel = this.level;
		if (tempLevel > level) {
			level = tempLevel;
		}
	})
	return level;
}

// 获取某节点的下一级节点，返回子节点列表
function getChildren(treeObj) {
	return treeObj.children;
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
	console.dir(node);
	$(nodes).each(function() {
		if (typeof node != 'undefined' && this.id == node.id) {
			return true;
		}
		if (this.orderNumber != count) {
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

function getAllParentNodes(node) {
	var arrayObj = [];
	if (node == null || node.level == 0)
		return arrayObj;
	var pNode = node.getParentNode();
	arrayObj.push(node);
	if (pNode != null) {
		if (pNode.level > 0) {
			arrayObj = arrayObj.concat(getAllParentNodes(pNode));
		}
	}
	return arrayObj;
}