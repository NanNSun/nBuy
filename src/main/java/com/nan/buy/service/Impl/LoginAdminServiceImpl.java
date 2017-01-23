package com.nan.buy.service.Impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.nan.buy.dao.AdminMapper;
import com.nan.buy.model.Admin;
import com.nan.buy.service.LoginAdminService;

@Service
public class LoginAdminServiceImpl implements LoginAdminService {

	@Resource
	private AdminMapper adminMapper;
	
	//查询
	@Override
	public Admin select(Admin admin) {
		return adminMapper.selectForLogin(admin);
	}

}
