package com.nan.buy.dao;

import com.nan.buy.model.Idea;

public interface IdeaMapper {
    int deleteByPrimaryKey(String id);

    int insert(Idea record);

    int insertSelective(Idea record);

    Idea selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Idea record);

    int updateByPrimaryKey(Idea record);
}