package com.nan.buy.service.Impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.nan.buy.dao.ProductMapper;
import com.nan.buy.model.Product;
import com.nan.buy.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Resource
	private ProductMapper productMapper;

	@Override
	public List<Product> selectProduct() {
		return productMapper.selectProduct();
	}

	@Override
	public int insert(Product product) {
		return productMapper.insert(product);
	}

	@Override
	public int updateByPrimaryKeySelective(Product product) {
		return productMapper.updateByPrimaryKeySelective(product);
	}

	@Override
	public int delProduct(String pId) {
		return productMapper.deleteByPrimaryKey(pId);
	}

	@Override
	public List<Product> selectProductByName(String pName) {
		Map<String,Object> param=new HashMap<String, Object>();
		param.put("pName", pName);
		return productMapper.selectProductByName(param);
	}

	@Override
	public List<Product> selectProductByPtype(String pType) {
		Map<String,Object> param=new HashMap<String, Object>();
		param.put("pType", pType);
		return productMapper.selectProductByPType(param);
	}

}
