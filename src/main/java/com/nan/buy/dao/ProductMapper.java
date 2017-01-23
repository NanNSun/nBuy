package com.nan.buy.dao;

import java.util.List;
import java.util.Map;

import com.nan.buy.model.Product;

public interface ProductMapper {
    int deleteByPrimaryKey(String pId);

    int insert(Product record);

    int insertSelective(Product record);

    Product selectByPrimaryKey(String pId);

    int updateByPrimaryKeySelective(Product record);

    int updateByPrimaryKeyWithBLOBs(Product record);

    int updateByPrimaryKey(Product record);

	List<Product> selectProduct();

	List<Product> selectProductByName(Map<String, Object> param);

	List<Product> selectProductByPType(Map<String, Object> param);
}