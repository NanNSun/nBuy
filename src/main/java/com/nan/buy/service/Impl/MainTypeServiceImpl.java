package com.nan.buy.service.Impl;

import java.util.List;
import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.nan.buy.dao.MainTypeMapper;
import com.nan.buy.model.MainType;
import com.nan.buy.service.MainTypeService;

@Service
public class MainTypeServiceImpl implements MainTypeService {

	@Resource
	private MainTypeMapper mainTypeMapper;
	
	@Override
	public List<MainType> selectMainType() {
		return mainTypeMapper.selectMainType();
	}

	@Override
	public int addMainType(MainType mainType) {
		return mainTypeMapper.insert(mainType);
	}

	@Override
	public int updateByPrimaryKeySelective(MainType mainType) {
		return mainTypeMapper.updateByPrimaryKeySelective(mainType);
	}

	@Override
	public int deleteByPrimaryKey(String tId) {
		return mainTypeMapper.deleteByPrimaryKey(tId);
	}

}
