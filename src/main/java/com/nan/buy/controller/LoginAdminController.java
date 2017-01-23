package com.nan.buy.controller;

import java.util.Enumeration;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.nan.buy.common.SessionConstants;
import com.nan.buy.common.StrUtil;
import com.nan.buy.model.Admin;
import com.nan.buy.service.LoginAdminService;


@Controller
@RequestMapping("admin")
public class LoginAdminController {

	@Resource
	LoginAdminService loginAdminService;

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login() {
		return "admin/login";
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String login(Admin admin, Model model, HttpSession httpSession) {
		if (StrUtil.notEmpty(admin.getaName(), admin.getaPass())) {
			Admin ad = loginAdminService.select(admin);
			if (ad != null) {
				httpSession.setAttribute(SessionConstants.SESSION_LOGIN, admin.getaName());
				return "admin/index";
			} else {
				model.addAttribute("msg", "用户名/密码错误");
			}
		} else {
			model.addAttribute("msg", "用户名/密码不能为空");
		}
		return "admin/login";
	}
	
	 @RequestMapping(value="/logout")
	    public String logout(HttpSession httpSession){
			Enumeration<String> em = httpSession.getAttributeNames();
			while (em.hasMoreElements()) {
				httpSession.removeAttribute(em.nextElement().toString());
			}
			httpSession.removeAttribute(SessionConstants.SESSION_LOGIN);
			httpSession.removeAttribute(SessionConstants.SESSION_USER);
			httpSession.invalidate();
			System.out.println("推出");
			return "redirect:/admin/login";
	    }
}
