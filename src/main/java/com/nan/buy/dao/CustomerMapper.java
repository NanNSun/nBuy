package com.nan.buy.dao;

import java.util.List;
import java.util.Map;

import com.nan.buy.model.Customer;

public interface CustomerMapper {
    int deleteByPrimaryKey(String cId);

    int insert(Customer record);

    int insertSelective(Customer record);

    Customer selectByPrimaryKey(String cId);

    int updateByPrimaryKeySelective(Customer record);

    int updateByPrimaryKey(Customer record);

	List<Customer> selectCustomer();

	List<Customer> selectCustomerByName(Map<String, Object> param);
}