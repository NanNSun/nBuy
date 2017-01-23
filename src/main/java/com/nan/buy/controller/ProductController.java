package com.nan.buy.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import com.nan.buy.model.Product;
import com.nan.buy.service.ProductService;

/**
 * 商品信息管理
 * @author
 *
 */
@Controller
@RequestMapping("product")
public class ProductController {

	@Resource
	private ProductService productService;
	/*
	 * 查询商品所有信息
	 */
	@RequestMapping("search/information")
	public List<Product> selectProduct(){
		System.out.println(productService.selectProduct().size());
		return productService.selectProduct();	
	}
	
	/*
	 * 添加张品
	 */
	@RequestMapping("add")
	@ResponseBody
	public Object add(Product product) {
		int msg = productService.insert(product);
		return (msg != 0) ? true : false;
	}
	
	/*
	 * 修改商品信息
	 */
	@RequestMapping("update")
	@ResponseBody
	public Object updateProduct(Product product) {
		int msg = productService.updateByPrimaryKeySelective(product);
		return (msg != 0) ? true : false;
	}
	
	/*
	 * 删除商品
	 */
	@RequestMapping("del")
	@ResponseBody
	public Object delProduct(Product product) {
		int msg = productService.delProduct(product.getpId());
		return (msg != 0) ? true : false;
	}
	
	/*
	 * 客户模糊查询
	 * 通过名称
	 */
	@RequestMapping("search/byPName")
	public List<Product> selectProductByPName(String pName){
		return productService.selectProductByName(pName);	
	}
	
	/*
	 * 通过分类
	 */
	@RequestMapping("search/byPType")
	public List<Product> selectProductByPtype(String pType){
		return productService.selectProductByPtype(pType);
	}
}
