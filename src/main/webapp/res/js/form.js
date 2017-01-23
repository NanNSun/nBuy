jQuery.extend({
	submit:function(form, options) {
		if(typeof form == 'string') form = $(form);
		if(form == null || form.length == 0 || !form.is('form')) return false;
		if(!form.form('validate')) return false;
		if(options == null) options = {};
		var params = form.serializeArray();
		var url = options.url ? options.url : form.attr('action');
		var method = options.method ? options.method : form.attr('method');
		if(!method) method = "POST";
		var type = options.type ? options.type : 'json';
		if(typeof options.prepare == 'function') {
			var flag = options.prepare.call(form,params);
			if(flag != null && !flag) return false;
		}
		if(typeof options.success != 'function') {
			options.success = function(data, status) {
				if(data != null && data.code < 0) {
					if(typeof options.fail == 'function') options.fail.call(this, data, status);
					if(typeof options.error == 'function') options.error.call(this, data.msg, status);
					else top.$error(data.msg);
					return;
				}
				if(typeof options.ok == 'function') options.ok.call(this,data,status);
				else top.$ok(data.msg);
				if(options.done == null || options.done) top.$window.close(window, 1, data);
			};
		}
		
		$.messager.progress();
		$.ajax({type:method,dataType:type,url:url,data:params,
			beforeSend:function(xhr) {
				if(typeof options.before == 'function') return options.before.call(xhr);
				return true;
			},
			error:function(xhr, status, error) {
				$.messager.progress('close');
				if(typeof options.error == 'function') options.error.call(this, error, status);
				else top.$error(error);
			},
			success:function(data,status,xhr){
				$.messager.progress('close');
				options.success(data,status);
			}
		});
	}
});
