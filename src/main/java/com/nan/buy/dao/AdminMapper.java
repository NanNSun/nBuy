package com.nan.buy.dao;

import com.nan.buy.model.Admin;

public interface AdminMapper {
    int deleteByPrimaryKey(String aId);

    int insert(Admin record);

    int insertSelective(Admin record);

    Admin selectByPrimaryKey(String aId);

    int updateByPrimaryKeySelective(Admin record);

    int updateByPrimaryKey(Admin record);

	Admin selectForLogin(Admin admin);
}