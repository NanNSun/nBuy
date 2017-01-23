package com.nan.buy.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nan.buy.model.MainType;
import com.nan.buy.service.MainTypeService;

/**
 * 商品主分类信息管理
 * @author
 *
 */
@Controller
@RequestMapping("mainType")
public class MainTypeController {

	@Resource
	private MainTypeService mainTypeService;
	
	/*
	 * 查询所有
	 */
	@RequestMapping("search/information")
	public List<MainType> selectMainType(){
		return mainTypeService.selectMainType();
	}
	
	/*
	 * 添加主分类
	 */
	@RequestMapping("add")
	public Object add(MainType mainType){
		int msg=mainTypeService.addMainType(mainType);
		return (msg != 0) ? true : false;
	} 
	
	/*
	 * 修改主分类信息
	 */
	@RequestMapping("update")
	public Object updateMainType(MainType mainType){
		int msg=mainTypeService.updateByPrimaryKeySelective(mainType);
		return (msg != 0) ? true : false;
	}
	
	/*
	 * 删除主分类信息
	 */
	@RequestMapping("del")
	public Object delMainType(String tId){
		int msg=mainTypeService.deleteByPrimaryKey(tId);
		return (msg != 0) ? true : false;
	}
}
