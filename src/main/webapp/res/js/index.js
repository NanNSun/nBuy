function selectedMenu(title, url) {
	if (title == null || url == null) {
		return;
	}
	var content = "<iframe scrolling='yes' frameborder='0' src='" + url
			+ "' style='width:100%;height:100%;'></iframe>";
	var flag = $('#main').tabs('exists', title);
	if (flag) {
		$('#main').tabs('select', title);
		var tab = $('#main').tabs('getSelected');
		$("#main").tabs('update', {
			tab : tab,
			options : {
				content : content
			}
		});
		return;
	}
	$('#main').tabs('add', {
		title : title,
		content : content,
		closable : true
	});
}

var $window = {
		wins:{},
		/**
		 * 显示窗口
		 * options
		 *	frame	: 是否内嵌框架方式打开，默认false
		 *	code	: 窗口代码，默认生成uuid
		 *	target	:　打开的窗口的ＵＲＬ地址
		 *	title	: 窗口标题
		 *	...		: easyui.window属性options
		 * @param options
		 */
		show: function(options) {
			if(options == null) return;
			if(typeof options == 'string') options = {uri:options};
			else if(typeof options != 'object' || !options.content && !options.uri) return;
			var uuid = Math.uuid();
			if(options.frame) {
				if(!options.code) options.code = uuid;
				$frame.open(options);
				return;
			}
			var win = $('<div class="easyui-window" style="overflow:hidden;"></div>');
			$window.wins[uuid] = win;
			if(options.options)	win[0].options = options.options;
			else win[0].options = {};
			win[0].options.uuid = uuid;
			options = $.extend({minimizable:false,maximizable:false,modal:true,inline:false,collapsible:false,iconCls:'icon-web'},options);
			if(!options.width) options.width = Math.min(document.documentElement.clientWidth - 100, 800);
			else if(options.width > document.documentElement.clientWidth) options.left = 10;
			if(!options.height) options.height = Math.max(document.documentElement.clientHeight - 60, 300);
			else if(options.height > document.documentElement.clientHeight) options.top = 10;
			options.onClose = this.destroy;
			options.onOpen = this.oninit;
			options.onMove = function(left,top) {
				var ml = 0,mt = 0;
				if(left <= 0) ml = 2;
				else if(document.documentElement.clientWidth > 50 && left >= document.documentElement.clientWidth) ml = document.documentElement.clientWidth - 20;
				else ml = left;
				if(top <= 0) mt = 2; 
				else if(document.documentElement.clientHeight > 50 && top >= document.documentElement.clientHeight) mt = document.documentElement.clientHeight - 20;
				else mt = top;
				if(ml != left || mt != top) win.window('move',{left:ml,top:mt});
			};
			if(options.content) {
				win.window(options);
				win.html('<div id="'+uuid+'" style="width:100%;height:100%;overflow:auto;">'+options.content+'</div>');
				if(typeof options.callback === 'function') options.callback.call(win);
			}
			else {
				var url = options.uri;
				if(options.options && options.options.from) url = $.webpath(url, options.options.from);
				var params = "";
				if(options.params) {
					if(typeof options.params == 'string') params = options.params;
					else if($.isArray(options.params)) {
						var param;
						for(var i = 0; i < options.params.length; i++) {
							param = options.params[i];
							if(param != null) params += "&"+encodeURIComponent(param.name) + "=" + encodeURIComponent(param.value);
						}
					}
					else if(typeof options.params == 'object'){
						for(var name in options.params) {
							if(options.params[name] != null) params += "&"+encodeURIComponent(name) + "=" + encodeURIComponent(options.params[name]);
						}
					}
					if(params.length > 0) {
						if(url.indexOf('?') != -1) url += params;
						else url += "?" + params.substring(1);
					}
				}
				win.window(options);
				win.append('<iframe id="frame_'+uuid+'" src="'+url+'" class="frame"  frameborder="no" style="width:100%;height:100%;overflow:auto;"></iframe>');
			}
		},
		/**
		 * 关闭窗口
		 * @param context 操作上下文，字符串表示窗口ID，否则为窗口对象
		 * @type >0表示成功关闭，=0表示失败关闭，<0表示直接关闭
		 */
		close:function(context, type, result) {
			if(context == null) return;
			var id = (typeof context == 'string') ? context : context.frameElement.id.replace(/frame_/g,'');
			var win = $window.wins[id];
			if(win == null) return $frame.close(context, type, result);
			if(type != null && win[0].options) {
				//当页面初始化完时，调用自定义的初始化方法
				if(type > 0 && typeof win[0].options.success === 'function') win[0].options.success.call(win,result);
				else if(type == 0 && typeof win[0].options.error === 'function') win[0].options.error.call(win,result);
				else if(type < 0 && typeof win[0].options.close === 'function') win[0].options.close.call(win,result);
			};
			if(/msie/.test(navigator.userAgent.toLowerCase())) win.remove('iframe');
			win.window("close");
			delete $window.wins[id];
			$window.wins[id] = undefined;
		},
		/**
		 * 获取窗口属性
		 * @param context 操作上下文，字符串表示窗口ID，否则为窗口对象
		 */
		options:function(context) {
			if(context == null) return;
			var id = typeof context === 'string' ? context : context.frameElement.id.replace(/frame_/g,'');
			var win = $window.wins[id];
			if(win != null) {
				if(win[0].options) return win[0].options;
				return {};
			}
			else return $frame.options(id);
		},
		win:function(context) {
			if(context == null) return null;
			var id = typeof context === 'string' ? context : context.frameElement.id;
			return $window.wins[id];
		},
		oninit: function() {
			if(this.options) {
				//当页面初始化完时，调用自定义的初始化方法
				if(typeof this.options.init === 'function') this.options.init.call(this, $("#"+this.options.uuid));
			}
		},
		destroy: function() {
			if(this.options) {
				//当页面销毁时，调用自定义的销毁方法
				if(typeof this.options.destroy === 'function') this.options.destroy.call(this);
			}
			if($.browser.msie) $(this).remove('iframe');
			$(this).window('destroy');
		}
	};

