// 表格基础边框值
var baseBorderWidth = '0px 1px 1px 0px';
var colCounts = "";
var rowCounts = "";

// 设置树的每级结束节点标识
function setEndFlag(nodes) {
	var reverseNodes = nodes.reverse();
	var allLevel = 1;
	$(reverseNodes).each(function(n) {
		if (n == 0) {
			allLevel = this.level;
			this.isEndNode = true;
			allLevel--;
		} else {
			if (allLevel == this.level) {
				this.isEndNode = true;
				allLevel--;
			} else {
				this.isEndNode = false;
			}
		}
	});

	return reverseNodes.reverse();
}

// 构建单元格html
function cellHtml(colspan, rowspan, name, borderWidth) {
	if (typeof colspan == 'undefined') {
		colspan = 1;
	}
	if (typeof rowspan == 'undefined') {
		rowspan = 1;
	}
	if (typeof name == 'undefined') {
		name = '';
	}
	if (typeof borderWidth == 'undefined') {
		borderWidth = baseBorderWidth;
	}
	var html = "<td style='border: solid #000000; border-width:" + borderWidth + ";' colspan='" + colspan + "' rowspan='" + rowspan + "'>"
	+ name + "</td>"
	return html;
}

// 构建表格html
function buildTable(appen) {
	var frequency=$("#frequency").val();
	var report=reportShow(appen);
	
	var otherTree = $.fn.zTree.getZTreeObj('tree-centerDown');
	var mainTree = $.fn.zTree.getZTreeObj('tree-centerUp');

	var otherTreeLevels = getLevels(otherTree.getNodes()[0]);
	var otherTreeNodeArray = new Array();
	for (var i = 0; i < otherTreeLevels; i++) {
		otherTreeNodeArray[i] = "";
	}

	var mainTreeLevels = getLevels(mainTree.getNodes()[0]);
	
	var subOtherTreeNodes = getAllsTreesNode(otherTree.getNodes()[0],appen);
	subOtherTreeNodes = setEndFlag(subOtherTreeNodes);
	var columnNum = 0;
	$(subOtherTreeNodes)
			.each(
					function() {
						var tempLevel = this.level;
						var colspanNum = getLeafChildrenNum(this);
						var rowspanNum = 1;
						if (!this.isParent) {
							columnNum++;
							if (tempLevel < otherTreeLevels) {
								rowspanNum = otherTreeLevels - tempLevel
										+ 1;
							}
						}
						$(getAllChildren(this)).each(function (index,ele){
							if(ele.id=='f601f2104d9244e9aa4c5cba9643b2b7'){
								var timeNum = getLeafChildrenNum(ele);
								colspanNum=parseInt(colspanNum)+parseInt(appen*timeNum)-timeNum;
							}
						});
						var tempborderWidth = baseBorderWidth;
						if (tempLevel == 1 && this.isEndNode == true) {
							tempborderWidth = '2px 0px 1px 0px';
						} else if (tempLevel == 1) {
							tempborderWidth = '2px 1px 1px 0px';
						} else if (this.isEndNode == true) {
							tempborderWidth = '0px 0px 1px 0px';
						}
						otherTreeNodeArray[tempLevel - 1] += cellHtml(colspanNum, rowspanNum, this.name, tempborderWidth);
						
					});
	var tableHtml = "<tr>" + cellHtml(mainTreeLevels, otherTreeLevels, '', '2px 1px 1px 0px');
	
	$(otherTreeNodeArray).each(function(n, value) {
		if (n > 0) {
			tableHtml += "<tr>";
		}
		tableHtml += value;
		tableHtml += "</tr>";
	});

	var mainTreeNodeArray = new Array();
	for (var i = 0; i < mainTreeLevels; i++) {
		mainTreeNodeArray[i] = "";
	}

	var subMainTreeNodes = getAllsTreesNode(mainTree.getNodes()[0],appen);
	subMainTreeNodes = setEndFlag(subMainTreeNodes);
	var mainTreeNodeArrayNum = -1;
	$(subMainTreeNodes)
			.each(
					function(n) {
						var tempLevel = this.level;
						
						var rowspanNum = getLeafChildrenNum(this);
						var colspanNum = 1;
						if (!this.isParent) {
							if (tempLevel < mainTreeLevels) {
								colspanNum = mainTreeLevels - tempLevel + 1;
							}
						}
						var tempborderWidth = baseBorderWidth;
						if (this.isEndNode == true) {
							tempborderWidth = '0px 1px 2px 0px';
						}
						$(getAllChildren(this)).each(function (index,ele){
							if(ele.id=='f601f2104d9244e9aa4c5cba9643b2b7'){
								var timeNum = getLeafChildrenNum(ele);
								rowspanNum=parseInt(rowspanNum)+parseInt(appen*timeNum)-timeNum;
							}
						});
						if (tempLevel == 1 || this.getPreNode() != null) {
								mainTreeNodeArray[++mainTreeNodeArrayNum] = cellHtml(colspanNum, rowspanNum, this.name, tempborderWidth);
						} else {
							if(this.id=='f601f2104d9244e9aa4c5cba9643b2b7'){
								if(this.objType==1){
									mainTreeNodeArray[mainTreeNodeArrayNum] += cellHtml(colspanNum, rowspanNum, this.name, tempborderWidth);
								}else{
									mainTreeNodeArray[++mainTreeNodeArrayNum] = cellHtml(colspanNum, rowspanNum, this.name, tempborderWidth);
								}
							}else{
								mainTreeNodeArray[mainTreeNodeArrayNum] += cellHtml(colspanNum, rowspanNum, this.name, tempborderWidth);
							}
							
						}
					});
	$(mainTreeNodeArray)
			.each(
					function(n, value) {
						tableHtml += "<tr>" + value;
						for (var i = 0; i < columnNum; i++) {
							var tempborderWidth = baseBorderWidth;
							if (mainTreeNodeArray.length - 1 == n && columnNum - 1 == i) {
								tempborderWidth = '0px 0px 2px 0px';
							} else if (mainTreeNodeArray.length - 1 == n) {
								tempborderWidth = '0px 1px 2px 0px';
							} else if (columnNum - 1 == i) {
								tempborderWidth = '0px 0px 1px 0px';
							}
							tableHtml += cellHtml(1, 1, '', tempborderWidth);
						}
						tableHtml += "</tr>";
					});
	$('#build-table').html(tableHtml);

	$("#mainCount").textbox("setValue", mainTreeLevels);
	$("#otherCount").textbox("setValue", otherTreeLevels);
	colCounts=columnNum+mainTreeLevels;
	rowCounts=mainTreeNodeArrayNum+otherTreeLevels+1;
}