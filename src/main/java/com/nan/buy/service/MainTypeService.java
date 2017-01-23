package com.nan.buy.service;

import java.util.List;

import com.nan.buy.model.MainType;

public interface MainTypeService {

	//查询分类信息
	List<MainType> selectMainType();

	//添加主分类信息
	int addMainType(MainType mainType);

	//修改主分类信息
	int updateByPrimaryKeySelective(MainType mainType);

	//删除主分类信息
	int deleteByPrimaryKey(String tId);

}
