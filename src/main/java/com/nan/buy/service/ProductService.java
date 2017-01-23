package com.nan.buy.service;

import java.util.List;


import com.nan.buy.model.Product;

public interface ProductService {

	//查询所有商品信息
	List<Product> selectProduct();

	//添加商品
	int insert(Product product);

	//修改商品信息
	int updateByPrimaryKeySelective(Product product);

	//删除商品
	int delProduct(String pId);

	//模糊查询
	//通过名称
	List<Product> selectProductByName(String pName);

	//通过分类
	List<Product> selectProductByPtype(String pType);

}
