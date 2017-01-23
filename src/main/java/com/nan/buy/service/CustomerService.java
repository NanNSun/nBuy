package com.nan.buy.service;

import java.util.List;

import com.nan.buy.model.Customer;

public interface CustomerService {

	/*
	 * 查询客户所有信息
	 */
	List<Customer> selectCustomer();
	/*
	 * 注册用户
	 */
	int insertSelective(Customer customer);
	/*
	 * 修改客户信息
	 */
	int updateByPrimaryKeySelective(Customer customer);
	/*
	 * 删除客户信息
	 */
	int delCustomer(String string);
	/*
	 * 客户模糊查询
	 */
	List<Customer> selectCustomerByName(String cName);

	
}
