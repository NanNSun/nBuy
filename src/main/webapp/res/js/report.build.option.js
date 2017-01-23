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
	var otherTree = $.fn.zTree.getZTreeObj('tree-centerDown');
	var mainTree = $.fn.zTree.getZTreeObj('tree-centerUp');

	var otherTreeLevels = getLevels(otherTree.getNodes()[0]);
	var otherTreeNodeArray = new Array();
	for (var i = 0; i < otherTreeLevels; i++) {
		otherTreeNodeArray[i] = "";
	}

	var mainTreeLevels = getLevels(mainTree.getNodes()[0]);

	var subOtherTreeNodes = getAllChildren(otherTree.getNodes()[0]);
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
						var tempborderWidth = baseBorderWidth;
						if (tempLevel == 1 && this.isEndNode == true) {
							tempborderWidth = '2px 0px 1px 0px';
						} else if (tempLevel == 1) {
							tempborderWidth = '2px 1px 1px 0px';
						} else if (this.isEndNode == true) {
							tempborderWidth = '0px 0px 1px 0px';
						}
						otherTreeNodeArray[tempLevel - 1] += cellHtml(colspanNum, rowspanNum, this.name, tempborderWidth);
						if(appen==2){
							var unit=rowspanNum+tempLevel-1
							if(unit==otherTreeLevels){
								var tempborderWidth = baseBorderWidth;
								if (tempLevel == 1 && this.isEndNode == true) {
									tempborderWidth = '0px 0px 1px 0px';
								} else if (tempLevel == 1) {
									tempborderWidth = '0px 1px 1px 0px';
								} else if (this.isEndNode == true) {
									tempborderWidth = '0px 0px 1px 0px';
								}
								otherTreeNodeArray[otherTreeLevels]+=cellHtml(1, 1, this.unitName, tempborderWidth);
							}
						}
					});
	if(appen==1){
		var tableHtml = "<tr>" + cellHtml(mainTreeLevels, otherTreeLevels, '', '2px 1px 1px 0px')+cellHtml(1, otherTreeLevels, '单位', '2px 1px 1px 0px');
	}else{
		var tableHtml = "<tr>" + cellHtml(mainTreeLevels, otherTreeLevels, '', '2px 1px 1px 0px');
	}
	$(otherTreeNodeArray).each(function(n, value) {
		if (n > 0) {
			if(n==otherTreeLevels){
				if(appen==2){
					tableHtml += "<tr>" + cellHtml(mainTreeLevels, 1, '单位', '0px 1px 1px 0px');
				}else{
					tableHtml += "<tr>";
				}
			}else{
				tableHtml += "<tr>";
			}
		}
		tableHtml += value;
		tableHtml += "</tr>";
	});

	var mainTreeNodeArray = new Array();
	for (var i = 0; i < mainTreeLevels; i++) {
		mainTreeNodeArray[i] = "";
	}

	var subMainTreeNodes = getAllChildren(mainTree.getNodes()[0]);
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
						if (tempLevel == 1 || this.getPreNode() != null) {
							mainTreeNodeArray[++mainTreeNodeArrayNum] = cellHtml(colspanNum, rowspanNum, this.name, tempborderWidth);
						} else {
							mainTreeNodeArray[mainTreeNodeArrayNum] += cellHtml(colspanNum, rowspanNum, this.name, tempborderWidth);
						}
						if(appen==1){
							var unit=colspanNum+tempLevel-1
							if(unit==mainTreeLevels){
								mainTreeNodeArray[mainTreeNodeArrayNum] += cellHtml(1, 1, this.unitName, tempborderWidth);
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
	
	if(appen==1){
		$('#mainCount').val(mainTreeLevels+1);
	}else{
		$('#mainCount').val(mainTreeLevels);
	}
	if(appen==2){
		$('#otherCount').val(otherTreeLevels+1);
	}else{
		$('#otherCount').val(otherTreeLevels);
	}
	colCounts=columnNum+mainTreeLevels;
	rowCounts=mainTreeNodeArrayNum+otherTreeLevels+1;
}