//全局变量
var $g = {
	basepath : '/',
	gridMenuOpt : function(value, row, index) {
		return '<div class="opt-menu" onclick="popupmenu(event,' + index + ');" ></div>';
	},
	gridBoolean : function(value, row, index) {
		return value ? '<div class="val-true"/>' : '<div class="val-false"/>';
	}
};

$(document).keydown(function(e) {
	var keynum = e.keyCode || e.which;
	var target = e.srcElement || e.target;
	if (keynum == 17 || keynum == 8) {
		if (target && !(target.type == 'text' || target.type == 'password' || target.type == 'textarea') || target.readOnly || target.readonly) { return false; }
	}
	return true;
});

/**
 * 按钮弹出页面
 */
function optShow() {
	var $this = $(this);
	var code = $this.attr('code');
	var title = $this.attr('title');
	var uri = $this.attr('uri');
	var frame = $this.attr('frame');
	frame = frame == "true" || frame == "1";
	var pw = parseInt($this.attr('pw'));
	if (isNaN(pw)) pw = null;
	var ph = parseInt($this.attr('ph'));
	if (isNaN(ph)) ph = null;
	if (title == null || uri == null) return;
	var options = {
		code : code,
		title : title,
		uri : uri,
		frame : frame,
		width : pw,
		height : ph
	};
	show(options);
}

/**
 * 显示对话框
 * 
 * @param {}
 *            options
 */
function show(options) {
	if (options == null) return;
	if(options.options == null) options.options = {from:window};
	else options.options.from = window;
	top.$window.show(options);
}

/**
 * 系统提示
 * 
 * @param msg
 * @param title
 */
function $prompt(msg, title) {
	$.messager.show({
		title : title ? title : '系统提示',
		msg : msg ? msg : '操作成功',
		timeout : 5000,
		showType : 'slide'
	});
}

/**
 * 成功提示
 * 
 * @param msg
 * @param title
 */
function $ok(msg, title) {
	$.messager.show({
		title : title ? title : '成功提示',
		msg : msg ? msg : '操作成功',
		timeout : 5000,
		showType : 'slide'
	});
}

/**
 * 系统提示
 * 
 * @param msg
 */
function $alert(msg) {
	$.messager.alert('系统提示', msg ? msg : '操作错误', 'question');
}

/**
 * 系统提示
 * 
 * @param msg
 */
function $info(msg) {
	$.messager.alert('系统提示', msg ? msg : '操作信息', 'info');
}

/**
 * 警告提示
 * 
 * @param msg
 * @param title
 * @param icon
 * @param func
 */
function $warn(msg, title, icon, func) {
	$.messager.alert(title ? title : '警告提示', msg ? msg : '操作警告', icon ? icon : 'warning', func);
}

/**
 * 错误提示
 * 
 * @param msg
 * @param title
 * @param icon
 * @param func
 */
function $error(msg, title, icon, func) {
	$.messager.alert(title ? title : '错误提示', msg ? msg : '操作错误', icon ? icon : 'error', func);
}

/**
 * 提示选择执行
 * 
 * @param msg
 * @param func
 * @param title
 */
function $confirm(msg, func, title) {
	$.messager.confirm(title ? title : '系统提示', msg, function(r) {
		if (r && func) func.call(this);
	});
}

/**
 * 通用查询
 * 
 * @param grid
 *            网格选择器
 * @param form
 *            表单选择器
 */
function $query(grid, form) {
	if (grid == null) grid = '#grid';
	if (form == null) form = '#queryForm';
	if (!$(form).form('validate')) return false;
	grid = $(grid);
	var params = {};
	var ps = $(form).serializeArray();
	for(var i = 0; i < ps.length; i++) {
		params[ps[i].name] = ps[i].value;
	}
	grid.datagrid('options').queryParams = params;
	grid.datagrid('uncheckAll').datagrid('load');
	return true;
}

/**
 * 显示或隐藏筛选
 */
function $clause(clause) {
	var isHide = $(clause).is(':hidden');
	if (isHide) $(this).linkbutton({
		iconCls : 'icon-up',
		text : '隐藏筛选'
	});
	else $(this).linkbutton({
		iconCls : 'icon-down',
		text : '显示筛选'
	});
	$(clause).slideToggle();
}

// ===========功能函数=============

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,'');
};

String.prototype.sizeAt = function() {
	var nLen = 0;
	for ( var i = 0, end = this.length; i < end; i++)
		nLen += this.charCodeAt(i) > 128 ? 2 : 1;
	return nLen;
};

String.prototype.cutStr = function(n, sCut) {
	if (this.sizeAt() <= n) return this;
	sCut = sCut || "";
	var max = n - sCut.sizeAt();
	var nLen = 0;
	var s = this;
	for ( var i = 0, end = this.length; i < end; i++) {
		nLen += this.charCodeAt(i) > 128 ? 2 : 1;
		if (nLen > max) {
			s = this.slice(0, i);
			s += sCut;
			break;
		}
	}
	return s.toString();
};

String.prototype.cutStrButUrl = function(n, sCut) {
	if (this.sizeAt() <= n) return this.toString();
	sCut = sCut || "";
	var max = n - sCut.sizeAt();
	var s = this;
	// 查找所有包含的url
	var aUrl = s.match(/https?:\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-_A-Z0-9a-z\$\.\+\!\*\/,:;@&=\?\~\#\%]*)*/gi);
	// 当第max个字符刚好在url之间时，bCut会被设置为flase;
	var bCut = true;
	if (aUrl) {
		// 对每个url进行判断
		for ( var i = 0, endI = aUrl.length; i < endI; i++) {
			var sUrl = aUrl[i];
			// 可能出现两个相同url的情况
			var aP = s.split(sUrl);
			var nCurr = 0;
			var nLenURL = sUrl.sizeAt();
			var sResult = "";
			for (j = 0, endJ = aP.length; j < endJ; j++) {
				nCurr += aP[j].sizeAt();
				sResult += aP[j];
				sResult += sUrl;
				// 当前字数相加少于max但添加url超过max：即会截到url
				if (nCurr < max && nCurr + nLenURL > max) {
					s = sResult + sCut;
					bCut = false;
					break;
				}
				nCurr += nLenURL;
			}
			if (bCut === false) break;
		}
		;
	}
	if (bCut) s = s.cutStr(n, sCut);
	return s.toString();
};

// web功能
jQuery.extend({
	webpath : function(uri, win) {
		if (uri.indexOf('http') == 0) return uri;
		if (uri.indexOf('/') == 0) return ($g.basepath + uri).replace(/\/\//g, '/');
		if (!win) win = window;
		var parentpath = win.location.pathname;
		var i = parentpath.lastIndexOf('/');
		parentpath = i > 0 ? parentpath.substring(0, i + 1) : '';
		if (uri.indexOf('./') == 0) return (parentpath + uri.substring(2)).replace(/\/\//g, '/');
		if (uri.indexOf('../') == 0) {
			var times = 0;
			while (uri.indexOf('../') == 0) {
				times++;
				uri = uri.substring(3);
			}
			var pn = parentpath.replace(/\/$/, '');
			for ( var i = 0; i < times; i++) {
				pn = pn.replace(/\/[^\/]*$/g, '');
			}
			return (pn + '/' + uri).replace(/\/\//g, '/');
		}
		return (parentpath + uri).replace(/\/\//g, '/');
	},
	datetrim : function(date) {
		if (date == null) return '';
		if (typeof date != 'string') date = date.toString();
		return date.replace(/((\s|:)00)+(|.000)$/g, '');
	}
});

(function() {
	var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	Math.uuid = function(len, radix) {
		var chars = CHARS, uuid = [], i;
		radix = radix || chars.length;
		if (len) {
			for (i = 0; i < len; i++)
				uuid[i] = chars[0 | Math.random() * radix];
		} else {
			var r;
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4';
			for (i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random() * 16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}
		return uuid.join('');
	};
	Math.uuidFast = function() {
		var chars = CHARS, uuid = new Array(36), rnd = 0, r;
		for ( var i = 0; i < 36; i++) {
			if (i == 8 || i == 13 || i == 18 || i == 23) {
				uuid[i] = '-';
			} else if (i == 14) {
				uuid[i] = '4';
			} else {
				if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
				r = rnd & 0xf;
				rnd = rnd >> 4;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
		return uuid.join('');
	};
	Math.uuidCompact = function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	};
})();
