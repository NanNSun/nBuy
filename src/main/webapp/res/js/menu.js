$(function() {
	InitLeftMenu();
	tabClose();
	tabCloseEven();
});

function loadMenu() {
	var pathName = window.document.location.pathname;
	var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	$.post(projectName+'/center/menu/userMenuJson',function(data){
		$.post(projectName+'/center/menu/userMenuType',function(result){
			if(result != null && result == "1"){
				initLeftMenuAccordion(data, projectName);
			}else{
				initLeftMenuTree(data, projectName);
			}
		});
	},'json');
}

//初始化左侧菜单
function InitLeftMenu() {
	$("#menu").empty();
	var menulist = "";
	$.each(_menus[0].children, function(i, n) {
		menulist += '<div title="' + n.text + '" data-options="iconCls:\''
				+ n.icon + '\'" style="overflow:auto;">';
		menulist += '<ul>';
		$.each(n.children, function(j, o) {
				menulist += '<li><div><a target="mainFrame'+o.id+'" href="' + o.url
						+ '" ><span class="icon ' + o.icon + '" ></span>'
						+ o.text + '</a></div></li> ';

		});
		menulist += '</ul></div>';
	});

	$("#menu").append(menulist);
	$("#menu").addClass("easyui-accordion");
	$("#menu").accordion({
		border : false,
		fit : true
	});

	$('.easyui-accordion li a').click(function() {
		var tabTitle = $(this).text();
		var url = $(this).attr("href");
		addTab(tabTitle, url, false, $(this).attr("target"));
		$('.easyui-accordion li div').removeClass("selected");
		$(this).parent().addClass("selected");
	}).hover(function() {
		$(this).parent().addClass("hover");
	}, function() {
		$(this).parent().removeClass("hover");
	});
}

//初始化左侧折叠菜单
function initLeftMenuAccordion(menus, projectName) {
	$("#menu").empty();
	var menulist = "";
	$.each(menus, function(i, menu) {
		menulist += '<div title="' + menu.text + '" data-options="iconCls:\''
				+ menu.iconCls + '\'" style="overflow:auto;">';
		menulist += '<ul>';
		if(menu.children != null){
			$.each(menu.children, function(j, child) {
					menulist += '<li><div><a target="mainFrame" href="' + projectName + child.attributes.url
							+ '" ><span class="icon ' + child.iconCls + '" ></span>&nbsp;'
							+ child.text + '</a></div></li> ';
	
			});
		}
		menulist += '</ul></div>';
	});

	$("#menu").append(menulist);
	$("#menu").addClass("easyui-accordion");
	$("#menu").accordion({
		border : false,
		fit : false
	});

	$('.easyui-accordion li a').click(function() {
		var tabTitle = $(this).text();
		var url = $(this).attr("href");
		addTab(tabTitle, url, false);
		$('.easyui-accordion li div').removeClass("selected");
		$(this).parent().addClass("selected");
	}).dblclick(function() {
		var tabTitle = $(this).text();
		var url = $(this).attr("href");
		addTab(tabTitle, url, true);
		$('.easyui-accordion li div').removeClass("selected");
		$(this).parent().addClass("selected");
	}).hover(function() {
		$(this).parent().addClass("hover");
	}, function() {
		$(this).parent().removeClass("hover");
	});
}

// 初始化左侧树菜单
function initLeftMenuTree(menus, projectName) {
	$("#menu").empty();
	$('#menu').tree({
		data: menus,
		onClick: function(node){
			if(node.attributes.url != ""){
				addTab(node.text, projectName + node.attributes.url, false);
			}
		},
		onDblClick: function(node){
			if(node.attributes.url != ""){
				addTab(node.text, projectName + node.attributes.url, true);
			}
		}}
	);
}

function addTab(subtitle, url, refresh, target) {
	if (!$('#tabs').tabs('exists', subtitle)) {
		$('#tabs').tabs('add', {
			title : subtitle,
			content : createFrame(url, target),
			closable : true,
			width : $('#mainPanle').width() - 10,
			height : $('#mainPanle').height() - 26
		});
	} else {
		$('#tabs').tabs('select', subtitle);
		if(refresh){
			var tab = $('#tabs').tabs('getSelected');
			$("#tabs").tabs('update', {
				tab : tab,
				options : {
					content : createFrame(url, target)
				}
			});
		}
	}
	tabClose();
}

function createFrame(url, target) {
	if (target == null) {
		target = "mainFrame";
	}
	var s = '<iframe name="'+target+'" scrolling="auto" frameborder="0"  src="'
			+ url + '" style="width:100%;height:100%;"></iframe>';
	return s;
}

function tabClose() {
	/* 双击关闭TAB选项卡 */
	$(".tabs-inner").dblclick(function() {
		var subtitle = $(this).children("span").text();
		$('#tabs').tabs('close', subtitle);
	});

	$(".tabs-inner").bind('contextmenu', function(e) {
		$('#mm').menu('show', {
			left : e.pageX,
			top : e.pageY,
		});

		var subtitle = $(this).children("span").text();
		$('#mm').data("currtab", subtitle);

		return false;
	});
}
// 绑定右键菜单事件
function tabCloseEven() {
	// 关闭当前
	$('#mm-tabclose').click(function() {
		var currtab_title = $('#mm').data("currtab");
		$('#tabs').tabs('close', currtab_title);
	});
	// 全部关闭
	$('#mm-tabcloseall').click(function() {
		$('.tabs-inner span').each(function(i, n) {
			var t = $(n).text();
			$('#tabs').tabs('close', t);
		});
	});
	// 关闭除当前之外的TAB
	$('#mm-tabcloseother').click(function() {
		var currtab_title = $('#mm').data("currtab");
		$('.tabs-inner span').each(function(i, n) {
			var t = $(n).text();
			if (t != currtab_title)
				$('#tabs').tabs('close', t);
		});
	});
	// 关闭当前右侧的TAB
	$('#mm-tabcloseright').click(function() {
		var nextall = $('.tabs-selected').nextAll();
		if (nextall.length == 0) {
			// msgShow('系统提示','后边没有啦~~','error');
			alert('后边没有啦~~');
			return false;
		}
		nextall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			$('#tabs').tabs('close', t);
		});
		return false;
	});
	// 关闭当前左侧的TAB
	$('#mm-tabcloseleft').click(function() {
		var prevall = $('.tabs-selected').prevAll();
		if (prevall.length == 0) {
			alert('到头了，前边没有啦~~');
			return false;
		}
		prevall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			$('#tabs').tabs('close', t);
		});
		return false;
	});

	// 退出
	$("#mm-exit").click(function() {
		$('#mm').menu('hide');
	});
}

// 弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
	$.messager.alert(title, msgString, msgType);
}

function clockon() {
	var now = new Date();
	var year = now.getFullYear(); // getFullYear getYear
	var month = now.getMonth();
	var date = now.getDate();
	var day = now.getDay();
	var hour = now.getHours();
	var minu = now.getMinutes();
	var sec = now.getSeconds();
	var week;
	month = month + 1;
	if (month < 10)
		month = "0" + month;
	if (date < 10)
		date = "0" + date;
	if (hour < 10)
		hour = "0" + hour;
	if (minu < 10)
		minu = "0" + minu;
	if (sec < 10)
		sec = "0" + sec;
	var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
	week = arr_week[day];
	var time = "";
	time = year + "年" + month + "月" + date + "日" + " " + hour + ":" + minu
			+ ":" + sec + " " + week;

	$("#bgclock").html(time);

	setTimeout("clockon()", 200);
}
