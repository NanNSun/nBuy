package com.nan.buy.dao;

import com.nan.buy.model.Notice;

public interface NoticeMapper {
    int deleteByPrimaryKey(String nId);

    int insert(Notice record);

    int insertSelective(Notice record);

    Notice selectByPrimaryKey(String nId);

    int updateByPrimaryKeySelective(Notice record);

    int updateByPrimaryKey(Notice record);
}