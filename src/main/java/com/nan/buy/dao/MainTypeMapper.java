package com.nan.buy.dao;

import java.util.List;

import com.nan.buy.model.MainType;

public interface MainTypeMapper {
    int deleteByPrimaryKey(String tId);

    int insert(MainType record);

    int insertSelective(MainType record);

    MainType selectByPrimaryKey(String tId);

    int updateByPrimaryKeySelective(MainType record);

    int updateByPrimaryKey(MainType record);

	List<MainType> selectMainType();
}