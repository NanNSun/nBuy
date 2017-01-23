package com.nan.buy.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nan.buy.service.PaymentService;

/**
 * 支付方式信息管理
 * @author
 *
 */
@Controller
@RequestMapping("payMent")
public class PaymentController {

	@Resource
	private PaymentService paymentService;
	
	
	
}
