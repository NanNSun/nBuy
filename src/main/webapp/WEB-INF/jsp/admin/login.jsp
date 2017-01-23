<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>数据新沂</title>
<style>
* {
	padding: 0;
	margin: 0;
}

li {
	list-style: none;
}
</style>
<script type="text/javascript" src="${ctx}/res/js/jquery.min.js"></script>
<script type="text/javascript">
	//登录
	function login() {
		//提交表单
		var loginName=$("#loginName").val();
		var password=$("#password").val();
		
		if(loginName == null || loginName == ''){
			$("#errorMsg").html("用户名不能为空！");
			$("#password").val("");
			return false;
		}
		if(password == null || password == ''){
			$("#errorMsg").html("密码不能为空！");
			$("#password").val("");
			return false;
		}	
		document.getElementById("loginForm").submit();
	}

	function reset() {
		document.getElementById("loginForm").reset();
	}
	
	$(function(){
		$("#password").keydown(function(e){
			if(e.keyCode==13){ 
				document.getElementById("loginForm").submit();
			}
		});
	});
</script>
</head>
<body style="background-color: #fff;">
	<c:set var="ctx" value="${pageContext.request.contextPath}" />
		<div style="padding-top: 28px;"></div>
<div style="background:url(${ctx}/res/img/login/BG_01.png) repeat-x; height:470px;">
			<div
				style="background:url(${ctx}/res/img/login/n_mian_bg_02.png) no-repeat; height:561px; width:1200px; margin:auto; position:relative;">
				<form action="${ctx}/admin/login" method="post" id="loginForm">
					<div style="position: absolute; top: 319px; left: 799px;">
						<ul>
							<li><input type="text" id="loginName" name="aName" value= "${aName}"
								style="height: 23px; line-height: 23px; width: 153px; border: none; background-color: transparent;"></li>
							<li style="margin-top: 12px;"><input id="password" 
								name="aPass" type="password"
								style="height: 23px; line-height: 23px; width: 153px; border: none; background-color: transparent;">
							</li>
						</ul>
					</div>
					<p id="errorMsg"style="padding-left: 800px; padding-top: 390px; color: red; font-size:12px">${msg}</p>
					<div style="position: absolute; top: 415px; right: 249px;">
						<input type="button" onclick="login()"
							style="background:url(${ctx}/res/img/login/n_login_btn_07.png) no-repeat; width:74px; height:27px; border:none; cursor:pointer;">&nbsp;
						<input type="button" onclick="reset()"
							style="background:url(${ctx}/res/img/login/n_cancel.png) no-repeat; width:74px; height:27px; border:none; cursor:pointer;">
					</div>
				</form>
		</div>
	</div>
</body>

</html>
