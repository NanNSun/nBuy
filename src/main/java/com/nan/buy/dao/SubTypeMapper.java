package com.nan.buy.dao;

import com.nan.buy.model.SubType;

public interface SubTypeMapper {
    int deleteByPrimaryKey(String sId);

    int insert(SubType record);

    int insertSelective(SubType record);

    SubType selectByPrimaryKey(String sId);

    int updateByPrimaryKeySelective(SubType record);

    int updateByPrimaryKey(SubType record);
}