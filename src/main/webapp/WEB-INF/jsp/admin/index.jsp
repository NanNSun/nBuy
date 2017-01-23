<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>nBuyAdmin</title>
<link rel="stylesheet" type="text/css" href="${ctx}/res/css/default.css">
<link rel="stylesheet" type="text/css" href="${ctx}/res/css/easyui.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/res/css/icon.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/res/css/style.css">
<script type="text/javascript" src="${ctx}/res/js/jquery.min.js"></script>
<script type="text/javascript" src="${ctx}/res/js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${ctx}/res/js/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="${ctx}/res/js/menu.js"></script>
<script type="text/javascript" src="${ctx}/res/js/index.js"></script>
<script type="text/javascript" src="${ctx}/res/js/base.js"></script>
</head>
<body class="easyui-layout" style="overflow-y: hidden; scroll: no">
<input value="${sessionuser.loginName}" id="loginId" type="hidden">
	
</body>
</html>