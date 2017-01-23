package com.nan.buy.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nan.buy.model.Customer;
import com.nan.buy.service.CustomerService;

/**
 * 客户信息管理
 * @author 
 *
 */

@Controller
@RequestMapping("customer")
public class CustomerController {

	@Resource
	private CustomerService customerService;
	/*
	 * 查询客户所有信息
	 */
	@RequestMapping("search/information")
	public List<Customer> selectCustomer(){
		return customerService.selectCustomer();	
	}
	
	/*
	 * 注册用户
	 */
	@RequestMapping("add")
	@ResponseBody
	public Object add(Customer customer) {
		int msg = customerService.insertSelective(customer);
		return (msg != 0) ? true : false;
	}
	
	/*
	 * 修改用户
	 */
	@RequestMapping("update")
	@ResponseBody
	public Object updateByPrimaryKeySelective(Customer customer) {
		int msg = customerService.updateByPrimaryKeySelective(customer);
		return (msg != 0) ? true : false;
	}
	
	/*
	 * 删除客户信息
	 */
	@RequestMapping("del")
	@ResponseBody
	public Object delCustomer(Customer customer) {
		int msg = customerService.delCustomer(customer.getcId());
		return (msg != 0) ? true : false;
	}
	
	/*
	 * 客户模糊查询
	 */
	@RequestMapping("search/informations")
	public List<Customer> selectCustomerByName(String cName){
		return customerService.selectCustomerByName(cName);	
	}
}
