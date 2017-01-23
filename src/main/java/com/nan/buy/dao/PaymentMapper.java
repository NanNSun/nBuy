package com.nan.buy.dao;

import com.nan.buy.model.Payment;

public interface PaymentMapper {
    int deleteByPrimaryKey(String payId);

    int insert(Payment record);

    int insertSelective(Payment record);

    Payment selectByPrimaryKey(String payId);

    int updateByPrimaryKeySelective(Payment record);

    int updateByPrimaryKey(Payment record);
}