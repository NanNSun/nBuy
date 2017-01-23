package com.nan.buy.model;

public class Payment {
    private String payId;

    private String payPayment;

    private String payMsg;

    public String getPayId() {
        return payId;
    }

    public void setPayId(String payId) {
        this.payId = payId == null ? null : payId.trim();
    }

    public String getPayPayment() {
        return payPayment;
    }

    public void setPayPayment(String payPayment) {
        this.payPayment = payPayment == null ? null : payPayment.trim();
    }

    public String getPayMsg() {
        return payMsg;
    }

    public void setPayMsg(String payMsg) {
        this.payMsg = payMsg == null ? null : payMsg.trim();
    }
}