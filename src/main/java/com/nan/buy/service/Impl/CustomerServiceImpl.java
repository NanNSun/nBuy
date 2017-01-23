package com.nan.buy.service.Impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.nan.buy.dao.CustomerMapper;
import com.nan.buy.model.Customer;
import com.nan.buy.service.CustomerService;

@Service
public class CustomerServiceImpl implements CustomerService {

	@Resource
	private CustomerMapper customerMapper;

	@Override
	public List<Customer> selectCustomer() {
		return customerMapper.selectCustomer();
	}

	@Override
	public int insertSelective(Customer customer) {
		return customerMapper.insertSelective(customer);
	}

	@Override
	public int updateByPrimaryKeySelective(Customer customer) {
		return customerMapper.updateByPrimaryKeySelective(customer);
	}

	@Override
	public int delCustomer(String cId) {
		return customerMapper.deleteByPrimaryKey(cId);
	}

	@Override
	public List<Customer> selectCustomerByName(String cName) {
		Map<String,Object> param=new HashMap<String, Object>();
		param.put("cName", cName);
		return customerMapper.selectCustomerByName(param);
	}

}
